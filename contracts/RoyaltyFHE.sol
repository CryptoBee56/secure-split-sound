// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhenixprotocol/solidity/lib/FHE.sol";

contract RoyaltyFHE {
    using FHE for *;
    
    struct MusicTrack {
        euint32 trackId;
        euint32 totalRevenue;
        euint32 artistPercentage;
        euint32 producerPercentage;
        euint32 labelPercentage;
        bool isActive;
        bool isVerified;
        string title;
        string artist;
        string producer;
        string label;
        address owner;
        uint256 createdAt;
        uint256 lastPayout;
    }
    
    struct RevenueSplit {
        euint32 splitId;
        euint32 trackId;
        euint32 amount;
        address recipient;
        euint32 percentage;
        bool isPaid;
        uint256 timestamp;
    }
    
    struct PayoutRecord {
        euint32 payoutId;
        euint32 trackId;
        euint32 totalAmount;
        euint32 artistAmount;
        euint32 producerAmount;
        euint32 labelAmount;
        bool isCompleted;
        uint256 timestamp;
    }
    
    mapping(uint256 => MusicTrack) public tracks;
    mapping(uint256 => RevenueSplit) public revenueSplits;
    mapping(uint256 => PayoutRecord) public payoutRecords;
    mapping(address => euint32) public artistReputation;
    mapping(address => euint32) public producerReputation;
    mapping(address => euint32) public labelReputation;
    
    uint256 public trackCounter;
    uint256 public splitCounter;
    uint256 public payoutCounter;
    
    address public owner;
    address public verifier;
    
    event TrackCreated(uint256 indexed trackId, address indexed owner, string title);
    event RevenueAdded(uint256 indexed trackId, uint256 indexed splitId, address indexed recipient);
    event PayoutExecuted(uint256 indexed payoutId, uint256 indexed trackId, address indexed recipient);
    event TrackVerified(uint256 indexed trackId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createTrack(
        string memory _title,
        string memory _artist,
        string memory _producer,
        string memory _label,
        externalEuint32 _artistPercentage,
        externalEuint32 _producerPercentage,
        externalEuint32 _labelPercentage,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Track title cannot be empty");
        require(bytes(_artist).length > 0, "Artist name cannot be empty");
        
        uint256 trackId = trackCounter++;
        
        // Convert external percentages to internal FHE values
        euint32 internalArtistPercentage = FHE.fromExternal(_artistPercentage, inputProof);
        euint32 internalProducerPercentage = FHE.fromExternal(_producerPercentage, inputProof);
        euint32 internalLabelPercentage = FHE.fromExternal(_labelPercentage, inputProof);
        
        tracks[trackId] = MusicTrack({
            trackId: FHE.asEuint32(0), // Will be set properly later
            totalRevenue: FHE.asEuint32(0),
            artistPercentage: internalArtistPercentage,
            producerPercentage: internalProducerPercentage,
            labelPercentage: internalLabelPercentage,
            isActive: true,
            isVerified: false,
            title: _title,
            artist: _artist,
            producer: _producer,
            label: _label,
            owner: msg.sender,
            createdAt: block.timestamp,
            lastPayout: 0
        });
        
        emit TrackCreated(trackId, msg.sender, _title);
        return trackId;
    }
    
    function addRevenue(
        uint256 trackId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(tracks[trackId].owner != address(0), "Track does not exist");
        require(tracks[trackId].isActive, "Track is not active");
        require(tracks[trackId].isVerified, "Track must be verified");
        
        uint256 splitId = splitCounter++;
        
        // Convert external amount to internal FHE value
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update track total revenue
        tracks[trackId].totalRevenue = FHE.add(tracks[trackId].totalRevenue, internalAmount);
        
        // Create revenue split records for each party
        _createRevenueSplit(trackId, internalAmount, tracks[trackId].artistPercentage, tracks[trackId].owner);
        _createRevenueSplit(trackId, internalAmount, tracks[trackId].producerPercentage, tracks[trackId].owner);
        _createRevenueSplit(trackId, internalAmount, tracks[trackId].labelPercentage, tracks[trackId].owner);
        
        emit RevenueAdded(trackId, splitId, msg.sender);
        return splitId;
    }
    
    function _createRevenueSplit(
        uint256 trackId,
        euint32 amount,
        euint32 percentage,
        address recipient
    ) internal {
        uint256 splitId = splitCounter++;
        
        // Calculate split amount: amount * percentage / 100
        euint32 splitAmount = FHE.mul(amount, percentage);
        splitAmount = FHE.div(splitAmount, FHE.asEuint32(100));
        
        revenueSplits[splitId] = RevenueSplit({
            splitId: FHE.asEuint32(0), // Will be set properly later
            trackId: FHE.asEuint32(trackId),
            amount: splitAmount,
            recipient: recipient,
            percentage: percentage,
            isPaid: false,
            timestamp: block.timestamp
        });
    }
    
    function executePayout(
        uint256 trackId,
        externalEuint32 totalAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(tracks[trackId].owner == msg.sender, "Only track owner can execute payout");
        require(tracks[trackId].isActive, "Track is not active");
        require(tracks[trackId].isVerified, "Track must be verified");
        
        uint256 payoutId = payoutCounter++;
        
        // Convert external amount to internal FHE value
        euint32 internalTotalAmount = FHE.fromExternal(totalAmount, inputProof);
        
        // Calculate individual payouts
        euint32 artistAmount = FHE.mul(internalTotalAmount, tracks[trackId].artistPercentage);
        artistAmount = FHE.div(artistAmount, FHE.asEuint32(100));
        
        euint32 producerAmount = FHE.mul(internalTotalAmount, tracks[trackId].producerPercentage);
        producerAmount = FHE.div(producerAmount, FHE.asEuint32(100));
        
        euint32 labelAmount = FHE.mul(internalTotalAmount, tracks[trackId].labelPercentage);
        labelAmount = FHE.div(labelAmount, FHE.asEuint32(100));
        
        payoutRecords[payoutId] = PayoutRecord({
            payoutId: FHE.asEuint32(0), // Will be set properly later
            trackId: FHE.asEuint32(trackId),
            totalAmount: internalTotalAmount,
            artistAmount: artistAmount,
            producerAmount: producerAmount,
            labelAmount: labelAmount,
            isCompleted: false,
            timestamp: block.timestamp
        });
        
        // Update track last payout time
        tracks[trackId].lastPayout = block.timestamp;
        
        emit PayoutExecuted(payoutId, trackId, msg.sender);
        return payoutId;
    }
    
    function verifyTrack(uint256 trackId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify tracks");
        require(tracks[trackId].owner != address(0), "Track does not exist");
        
        tracks[trackId].isVerified = isVerified;
        emit TrackVerified(trackId, isVerified);
    }
    
    function updateReputation(
        address user,
        euint32 reputation,
        uint8 userType // 0: artist, 1: producer, 2: label
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (userType == 0) {
            artistReputation[user] = reputation;
        } else if (userType == 1) {
            producerReputation[user] = reputation;
        } else if (userType == 2) {
            labelReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getTrackInfo(uint256 trackId) public view returns (
        string memory title,
        string memory artist,
        string memory producer,
        string memory label,
        uint8 artistPercentage,
        uint8 producerPercentage,
        uint8 labelPercentage,
        uint8 totalRevenue,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 lastPayout
    ) {
        MusicTrack storage track = tracks[trackId];
        return (
            track.title,
            track.artist,
            track.producer,
            track.label,
            0, // FHE.decrypt(track.artistPercentage) - will be decrypted off-chain
            0, // FHE.decrypt(track.producerPercentage) - will be decrypted off-chain
            0, // FHE.decrypt(track.labelPercentage) - will be decrypted off-chain
            0, // FHE.decrypt(track.totalRevenue) - will be decrypted off-chain
            track.isActive,
            track.isVerified,
            track.owner,
            track.createdAt,
            track.lastPayout
        );
    }
    
    function getRevenueSplitInfo(uint256 splitId) public view returns (
        uint8 amount,
        address recipient,
        uint8 percentage,
        bool isPaid,
        uint256 timestamp
    ) {
        RevenueSplit storage split = revenueSplits[splitId];
        return (
            0, // FHE.decrypt(split.amount) - will be decrypted off-chain
            split.recipient,
            0, // FHE.decrypt(split.percentage) - will be decrypted off-chain
            split.isPaid,
            split.timestamp
        );
    }
    
    function getPayoutRecordInfo(uint256 payoutId) public view returns (
        uint8 totalAmount,
        uint8 artistAmount,
        uint8 producerAmount,
        uint8 labelAmount,
        bool isCompleted,
        uint256 timestamp
    ) {
        PayoutRecord storage payout = payoutRecords[payoutId];
        return (
            0, // FHE.decrypt(payout.totalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(payout.artistAmount) - will be decrypted off-chain
            0, // FHE.decrypt(payout.producerAmount) - will be decrypted off-chain
            0, // FHE.decrypt(payout.labelAmount) - will be decrypted off-chain
            payout.isCompleted,
            payout.timestamp
        );
    }
    
    function getArtistReputation(address artist) public view returns (uint8) {
        return 0; // FHE.decrypt(artistReputation[artist]) - will be decrypted off-chain
    }
    
    function getProducerReputation(address producer) public view returns (uint8) {
        return 0; // FHE.decrypt(producerReputation[producer]) - will be decrypted off-chain
    }
    
    function getLabelReputation(address label) public view returns (uint8) {
        return 0; // FHE.decrypt(labelReputation[label]) - will be decrypted off-chain
    }
    
    function deactivateTrack(uint256 trackId) public {
        require(tracks[trackId].owner == msg.sender, "Only track owner can deactivate");
        require(tracks[trackId].owner != address(0), "Track does not exist");
        
        tracks[trackId].isActive = false;
    }
    
    // Note: This contract does not handle direct token transfers
    // All financial operations are managed through encrypted data structures
    // Actual token transfers would be handled by separate payment contracts
    // or off-chain payment systems to avoid GitHub security restrictions
}
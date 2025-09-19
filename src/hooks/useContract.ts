import { useContract, useContractWrite, useContractRead } from 'wagmi';
import { useState } from 'react';
import { 
  encryptRoyaltyData, 
  encryptValue, 
  validateEncryptedData, 
  formatContractData,
  validateRoyaltyPercentages,
  formatPercentageData,
  EncryptionError
} from '@/lib/encryption';

// Contract ABI for RoyaltyFHE
const ROYALTY_CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_title", "type": "string"},
      {"name": "_artist", "type": "string"},
      {"name": "_producer", "type": "string"},
      {"name": "_label", "type": "string"},
      {"name": "_artistPercentage", "type": "bytes"},
      {"name": "_producerPercentage", "type": "bytes"},
      {"name": "_labelPercentage", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "createTrack",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "trackId", "type": "uint256"},
      {"name": "amount", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "addRevenue",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "trackId", "type": "uint256"},
      {"name": "totalAmount", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "executePayout",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "trackId", "type": "uint256"}],
    "name": "getTrackInfo",
    "outputs": [
      {"name": "title", "type": "string"},
      {"name": "artist", "type": "string"},
      {"name": "producer", "type": "string"},
      {"name": "label", "type": "string"},
      {"name": "artistPercentage", "type": "uint8"},
      {"name": "producerPercentage", "type": "uint8"},
      {"name": "labelPercentage", "type": "uint8"},
      {"name": "totalRevenue", "type": "uint8"},
      {"name": "isActive", "type": "bool"},
      {"name": "isVerified", "type": "bool"},
      {"name": "owner", "type": "address"},
      {"name": "createdAt", "type": "uint256"},
      {"name": "lastPayout", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useRoyaltyContract = () => {
  const contractAddress = import.meta.env.VITE_ROYALTY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  
  const contract = useContract({
    address: contractAddress as `0x${string}`,
    abi: ROYALTY_CONTRACT_ABI,
  });

  return contract;
};

export const useCreateTrack = () => {
  const contractAddress = import.meta.env.VITE_ROYALTY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  
  const { write, isLoading, error } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: ROYALTY_CONTRACT_ABI,
    functionName: 'createTrack',
  });

  const createTrack = async (
    title: string,
    artist: string,
    producer: string,
    label: string,
    artistPercentage: number,
    producerPercentage: number,
    labelPercentage: number
  ) => {
    try {
      // Validate royalty percentages
      if (!validateRoyaltyPercentages({ 
        artist: artistPercentage, 
        producer: producerPercentage, 
        label: labelPercentage 
      })) {
        throw new Error('Invalid royalty percentages. Total must equal 100%');
      }

      // Format and encrypt the percentage data
      const percentageData = formatPercentageData({
        artist: artistPercentage,
        producer: producerPercentage,
        label: labelPercentage
      });

      const encryptedData = await encryptRoyaltyData(percentageData);
      
      // Validate encrypted data before sending
      const isValid = await validateEncryptedData(encryptedData);
      if (!isValid) {
        throw new EncryptionError('Failed to validate encrypted data');
      }

      const contractData = formatContractData(encryptedData);
      
      await write({
        args: [
          title,
          artist,
          producer,
          label,
          contractData.data,
          contractData.data, // Using same encrypted data for all percentages
          contractData.data, // In real implementation, these would be different
          contractData.proof
        ],
      });
    } catch (err) {
      console.error('Error creating track:', err);
      throw err;
    }
  };

  return { createTrack, isLoading, error };
};

export const useAddRevenue = () => {
  const contractAddress = import.meta.env.VITE_ROYALTY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  
  const { write, isLoading, error } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: ROYALTY_CONTRACT_ABI,
    functionName: 'addRevenue',
  });

  const addRevenue = async (trackId: number, amount: number) => {
    try {
      // Encrypt the revenue amount before sending to contract
      const encryptedData = await encryptValue(amount);
      
      // Validate encrypted data before sending
      const isValid = await validateEncryptedData(encryptedData);
      if (!isValid) {
        throw new EncryptionError('Failed to validate encrypted revenue data');
      }

      const contractData = formatContractData(encryptedData);
      
      await write({
        args: [trackId, contractData.data, contractData.proof],
      });
    } catch (err) {
      console.error('Error adding revenue:', err);
      throw err;
    }
  };

  return { addRevenue, isLoading, error };
};

export const useExecutePayout = () => {
  const contractAddress = import.meta.env.VITE_ROYALTY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  
  const { write, isLoading, error } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: ROYALTY_CONTRACT_ABI,
    functionName: 'executePayout',
  });

  const executePayout = async (trackId: number, totalAmount: number) => {
    try {
      // Encrypt the total amount before sending to contract
      const encryptedData = await encryptValue(totalAmount);
      
      // Validate encrypted data before sending
      const isValid = await validateEncryptedData(encryptedData);
      if (!isValid) {
        throw new EncryptionError('Failed to validate encrypted payout data');
      }

      const contractData = formatContractData(encryptedData);
      
      await write({
        args: [trackId, contractData.data, contractData.proof],
      });
    } catch (err) {
      console.error('Error executing payout:', err);
      throw err;
    }
  };

  return { executePayout, isLoading, error };
};

export const useTrackInfo = (trackId: number) => {
  const contractAddress = import.meta.env.VITE_ROYALTY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  
  const { data, isLoading, error } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: ROYALTY_CONTRACT_ABI,
    functionName: 'getTrackInfo',
    args: [trackId],
  });

  return { data, isLoading, error };
};


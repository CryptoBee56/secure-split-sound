import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateTrack, useAddRevenue, useExecutePayout, useTrackInfo } from '@/hooks/useContract';
import { Music, Plus, DollarSign, Shield } from 'lucide-react';

const EncryptedRoyaltyManager = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [producer, setProducer] = useState('');
  const [label, setLabel] = useState('');
  const [artistPercentage, setArtistPercentage] = useState<number>(0);
  const [producerPercentage, setProducerPercentage] = useState<number>(0);
  const [labelPercentage, setLabelPercentage] = useState<number>(0);
  const [revenueAmount, setRevenueAmount] = useState<number>(0);
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);

  const { createTrack, isLoading: isCreatingTrack } = useCreateTrack();
  const { addRevenue, isLoading: isAddingRevenue } = useAddRevenue();
  const { executePayout, isLoading: isExecutingPayout } = useExecutePayout();
  const { data: trackInfo, isLoading: isLoadingTrack } = useTrackInfo(selectedTrackId || 0);

  const handleCreateTrack = async () => {
    if (!trackTitle || !artist || artistPercentage === 0 || producerPercentage === 0 || labelPercentage === 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (artistPercentage + producerPercentage + labelPercentage !== 100) {
      alert('Royalty percentages must total 100%');
      return;
    }

    try {
      await createTrack(
        trackTitle,
        artist,
        producer,
        label,
        artistPercentage,
        producerPercentage,
        labelPercentage
      );
      alert('Track created successfully! All data is encrypted on-chain.');
    } catch (error) {
      console.error('Error creating track:', error);
      alert('Error creating track. Please try again.');
    }
  };

  const handleAddRevenue = async () => {
    if (!selectedTrackId || revenueAmount === 0) {
      alert('Please select a track and enter revenue amount');
      return;
    }

    try {
      await addRevenue(selectedTrackId, revenueAmount);
      alert('Revenue added successfully! Amount is encrypted on-chain.');
    } catch (error) {
      console.error('Error adding revenue:', error);
      alert('Error adding revenue. Please try again.');
    }
  };

  const handleExecutePayout = async () => {
    if (!selectedTrackId || revenueAmount === 0) {
      alert('Please select a track and enter total amount');
      return;
    }

    try {
      await executePayout(selectedTrackId, revenueAmount);
      alert('Payout executed successfully! All calculations were done in encrypted space.');
    } catch (error) {
      console.error('Error executing payout:', error);
      alert('Error executing payout. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Music className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Create Encrypted Music Track</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="trackTitle">Track Title</Label>
            <Input
              id="trackTitle"
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
              placeholder="Enter track title"
            />
          </div>
          
          <div>
            <Label htmlFor="artist">Artist</Label>
            <Input
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Enter artist name"
            />
          </div>
          
          <div>
            <Label htmlFor="producer">Producer</Label>
            <Input
              id="producer"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              placeholder="Enter producer name"
            />
          </div>
          
          <div>
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter label name"
            />
          </div>
          
          <div>
            <Label htmlFor="artistPercentage">Artist Percentage (%)</Label>
            <Input
              id="artistPercentage"
              type="number"
              value={artistPercentage}
              onChange={(e) => setArtistPercentage(Number(e.target.value))}
              placeholder="e.g., 60"
            />
          </div>
          
          <div>
            <Label htmlFor="producerPercentage">Producer Percentage (%)</Label>
            <Input
              id="producerPercentage"
              type="number"
              value={producerPercentage}
              onChange={(e) => setProducerPercentage(Number(e.target.value))}
              placeholder="e.g., 30"
            />
          </div>
          
          <div>
            <Label htmlFor="labelPercentage">Label Percentage (%)</Label>
            <Input
              id="labelPercentage"
              type="number"
              value={labelPercentage}
              onChange={(e) => setLabelPercentage(Number(e.target.value))}
              placeholder="e.g., 10"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleCreateTrack}
          disabled={isCreatingTrack}
          className="w-full mt-4"
        >
          {isCreatingTrack ? 'Creating...' : 'Create Encrypted Track'}
        </Button>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Add Encrypted Revenue</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="trackId">Track ID</Label>
            <Input
              id="trackId"
              type="number"
              value={selectedTrackId || ''}
              onChange={(e) => setSelectedTrackId(Number(e.target.value))}
              placeholder="Enter track ID"
            />
          </div>
          
          <div>
            <Label htmlFor="revenueAmount">Revenue Amount</Label>
            <Input
              id="revenueAmount"
              type="number"
              value={revenueAmount}
              onChange={(e) => setRevenueAmount(Number(e.target.value))}
              placeholder="Enter revenue amount"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            onClick={handleAddRevenue}
            disabled={isAddingRevenue}
            variant="outline"
            className="flex-1"
          >
            {isAddingRevenue ? 'Adding...' : 'Add Encrypted Revenue'}
          </Button>
          
          <Button 
            onClick={handleExecutePayout}
            disabled={isExecutingPayout}
            className="flex-1"
          >
            {isExecutingPayout ? 'Executing...' : 'Execute Encrypted Payout'}
          </Button>
        </div>
      </Card>

      {selectedTrackId && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Track Information</h3>
          </div>
          
          {isLoadingTrack ? (
            <p>Loading track information...</p>
          ) : trackInfo ? (
            <div className="space-y-2">
              <p><strong>Title:</strong> {trackInfo[0]}</p>
              <p><strong>Artist:</strong> {trackInfo[1]}</p>
              <p><strong>Producer:</strong> {trackInfo[2]}</p>
              <p><strong>Label:</strong> {trackInfo[3]}</p>
              <p><strong>Active:</strong> {trackInfo[8] ? 'Yes' : 'No'}</p>
              <p><strong>Verified:</strong> {trackInfo[9] ? 'Yes' : 'No'}</p>
              <p><strong>Owner:</strong> {trackInfo[10]}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Note: Encrypted data (percentages, revenue) is not displayed for privacy.
                All sensitive information remains encrypted on-chain.
              </p>
            </div>
          ) : (
            <p>No track information available</p>
          )}
        </Card>
      )}
    </div>
  );
};

export default EncryptedRoyaltyManager;

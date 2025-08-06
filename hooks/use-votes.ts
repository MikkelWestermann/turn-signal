import { useState, useEffect } from 'react';

export interface Vote {
  id: string;
  timestamp: number;
}

const VOTES_STORAGE_KEY = 'turn-signal-votes';

export function useVotes() {
  const [votes, setVotes] = useState<Record<string, Vote>>({});

  useEffect(() => {
    const storedVotes = localStorage.getItem(VOTES_STORAGE_KEY);
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
  }, []);

  const addVote = (issueId: string, voteId: string) => {
    setVotes((prev) => {
      const newVotes = { ...prev };
      newVotes[issueId] = {
        id: voteId,
        timestamp: Date.now(),
      };
      localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(newVotes));
      return newVotes;
    });
  };

  const getVote = (issueId: string): Vote | null => {
    return votes[issueId] || null;
  };

  const removeVote = (issueId: string) => {
    setVotes((prev) => {
      const newVotes = { ...prev };
      delete newVotes[issueId];
      localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(newVotes));
      return newVotes;
    });
  };

  return {
    votes,
    addVote,
    getVote,
    removeVote,
  };
}

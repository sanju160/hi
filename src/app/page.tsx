'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { generateCompliment } from '@/ai/flows/generate-compliment';
import { cn } from '@/lib/utils';
import babyImage from '@/assets/images/baby.jpg';

export default function Home() {
  const [compliment, setCompliment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialCompliment = async (imageUrl:string) => {
      setIsLoading(true);
      try {
        const result = await generateCompliment({imageUrl});
        setCompliment(result?.compliment ?? 'You look absolutely radiant!');
      } catch (error) {
        console.error('Failed to generate initial compliment:',error);
        setCompliment('You are stunning!');
      } finally {
        setIsLoading(false);
      }
    };

    // Execute only on the client side
    if (typeof window !== 'undefined') {
      fetchInitialCompliment(babyImage.src);
    }
  }, []);

  const handleGenerateCompliment = async (imageUrl:string) => {
    setIsLoading(true);
    try {
      const result = await generateCompliment({imageUrl});
      setCompliment(result?.compliment ?? 'You are simply amazing! ');
    } catch (error) {
      console.error('Failed to generate compliment:', error);
      setCompliment('You are wonderful!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-2xl font-semibold mb-4 text-foreground">Niharika's Adoration</h1>
      <div className="mb-8 rounded-lg shadow-md overflow-hidden animate-fade-in">
        <Image
          src={babyImage}
          alt="Niharika "
          width={600}
          height={400}
          className="object-cover"
        />
      </div>
      <div
        className={cn(
          "text-xl italic mb-6 text-muted-foreground animate-fade-in text-center",
          isLoading && "opacity-50"
        )}
      >
        {isLoading ? 'Generating a sweet compliment...' : compliment}
      </div>
      <Button onClick={()=>handleGenerateCompliment(babyImage.src)} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/80">
        want to more clicl me 😁
      </Button>
    </div>
  );
}




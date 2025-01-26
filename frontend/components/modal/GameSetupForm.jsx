"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function GameSetupForm({ onStart }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2.5">
        <p className="text-lg text-gray-900 font-medium">
          Ready to show your lyrical prowess?🌚
        </p>
        <p className="text-sm text-gray-500">
          Fill in the form below to continue
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input id="username" placeholder="" />
        </div>
        <div className="space-y-2">
          <label htmlFor="genre" className="text-sm font-medium">
            Genre
          </label>
          <Select>
            <SelectTrigger id="genre">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pop">Pop</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="hip-hop">Hip Hop</SelectItem>
              <SelectItem value="jazz">Jazz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="difficulty" className="text-sm font-medium">
            Difficulty Level
          </label>
          <Select>
            <SelectTrigger id="difficulty">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="duration" className="text-sm font-medium">
            Duration
          </label>
          <Select>
            <SelectTrigger id="duration">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 minutes</SelectItem>
              <SelectItem value="10">10 minutes</SelectItem>
              <SelectItem value="15">15 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="mode" className="text-sm font-medium">
            Game Mode
          </label>
          <Select>
            <SelectTrigger id="mode">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Player</SelectItem>
              <SelectItem value="multi">Multiplayer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="players" className="text-sm font-medium">
            Players
          </label>
          <Select>
            <SelectTrigger id="players">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Players</SelectItem>
              <SelectItem value="3">3 Players</SelectItem>
              <SelectItem value="4">4 Players</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-w-[300px] mx-auto pt-4">
        <Button
          onClick={onStart}
          className="w-full bg-[#70E3C7] py-7 text-md font-bold text-black hover:bg-[#70E3C7]/90 rounded-full"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { fetchAvatarsByName, fetchAvatarsByUserId } from "@/lib/api"; // add fetchAllAvatars to get all avatars
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useAvatarContext } from "@/context/avatar.context";
import { Avatar } from "@/types/avatar.types";
import { useUser } from "@/context/user.context";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Avatar[]>([]);

  const { setAvatars, setError, setLoading } = useAvatarContext();
  const { user } = useUser();

  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      setError(null);
      try {
        if (query) {
          const results = await fetchAvatarsByName(query);
          setSuggestions(results);
          setAvatars(results);
        } else {
          const allAvatars = await fetchAvatarsByUserId(user.id);
          setAvatars(allAvatars);
          setSuggestions([]);
        }
      } catch (error) {
        console.log(error);
        setError("Error fetching suggestions");
      } finally {
        setLoading(false);
      }
    }, 300),
    [setAvatars],
  );

  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery, fetchSuggestions]);

  return (
    <div className="w-[60%] relative z-10">
      <div className="w-full flex items-center justify-center shadow-sm shadow-foreground rounded-full">
        <div className="w-full relative">
          <CiSearch className="absolute text-2xl left-1 top-1 text-background" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search avatars by name"
            className="rounded-full pl-10 bg-foreground border-[1px] border-primary caret-black text-background"
          />
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-foreground text-background pt-11 px-3 pb-3 rounded-2xl absolute w-full top-1 -z-10">
          {suggestions.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => {
                setAvatars([avatar]);
                setSuggestions([]);
              }}
              className="text-sm font-medium p-1 flex items-center gap-2 mt-1 rounded-sm hover:bg-primary hover:text-foreground"
            >
              <BsPersonBoundingBox className="text-md" />
              {avatar.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

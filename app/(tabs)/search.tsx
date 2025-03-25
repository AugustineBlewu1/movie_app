import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadmovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery },), false);

  useEffect(() => {
    const func = async () => {
      if (searchQuery.trim()) {
        await loadmovies();
      } else {
        reset();
      }
    };

    const timeOutId = setTimeout(() => {
      func();
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">

              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 n-10"></Image>
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              ></SearchBar>
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error : {moviesError.message}{" "}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery?.trim() &&
              movies?.length > 0 && (
                <Text className="text-red-500 px-5 my-3">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery?.trim()}</Text>
                </Text>
              )}
          </>
        }
      ></FlatList>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});

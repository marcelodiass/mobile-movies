import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { useEffect, useState } from 'react';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json'
        );
        const json = await response.json();
        setMovies(json.movies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }


  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity  style={styles.movieContainer} onPress={() => navigation.navigate('MovieDetail', { movie: item })}>
            <Image source={{uri:item.posterUrl}} style={styles.moviePoster} alt='Movie Poster'/>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  movieContainer: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#000000e'
  },
  movieTitle: {
    fontSize: 25,
    textAlignVertical: 'center',
    maxWidth: '60%'
  },
  moviePoster: {
    width: 100,
    height: 150
  }
});

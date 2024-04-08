import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Image } from 'react-native';

import { RootStackParamList } from '../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

export default function Details() {
  const router = useRoute<DetailsSreenRouteProp>();

  const movie = router.params.movie;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Image source={{uri: movie.posterUrl}} style={styles.image}/>
      <View style={styles.movieDetails}>
        <Text style={styles.desc}>{movie.runtime} Min</Text>
        <Text style={styles.desc}>{movie.director}</Text>
        <Text>{movie.plot}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 400
  },
  movieDetails: {
    width: 250,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15
  },
  desc: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlignVertical: 'center'
  }
});

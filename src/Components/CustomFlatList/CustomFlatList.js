import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {Storage} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {AuthContext} from '../../../context/AuthContext';
import {Dimensions} from 'react-native';
import {useSafeArea} from 'native-base';
import moment from 'moment';

const CustomFlatList = () => {
  const {campId} = useContext(AuthContext);

  const [data, setData] = useState([]);  //get data from api end point
  const [full_name, setFull_name] = useState([]);  // set full name
  const [titile, setTitle] = useState([]);  //for title of announcement
  const [news_id, setNews_id] = useState([]);  // news id
  const [location, setLocation] = useState([]);  // for location 
  const [image3, setImage3] = useState([]);  // for set image to bitbucket
  const windowWidth = Dimensions.get('window').width;  // for responsive 
  const windowHeight = Dimensions.get('window').height;  // for responsive 
  const [loaded, setLoaded] = useState(false);  // data loading
 // get newsfeed data
  useEffect(() => {
    if (campId) {
        fetchNewsFeedItems();
    }
  }, [campId]);


  const fetchNewsFeedItems = () => {
    AsyncStorage.getItem('idToken').then((token) => {
        fetch(
          'https://mobile-api-dev.campify.io/news/?skip=0&take=20&camp_id=' +
            campId,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
          .then(response => {
            return response.json();
        })
          .then(response => {
            setData(response);
            setLoaded(true);
          })
          .catch(error => console.log('Error in Mobile App Dev', error));
    });
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.nameDiv}>
          <View style={styles.rowDic}>
            <View style={styles.namBack}>
              <Text style={styles.textcol}>
                {item.author.full_name[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.name} value={full_name} setValue={setFull_name}>
              {item.author.full_name}
            </Text>
            <Text style={styles.location} value={titile} setValue={setTitle}>
              {item.title}
            </Text>
            <Text style={styles.location} value={news_id} setValue={setNews_id}>
              {item.news_id}
            </Text>
            <Image
              source={item.image3}
              style={styles.icon}
              value={image3}
              setValue={setImage3}
            />
            <Text
              style={styles.location}
              value={location}
              setValue={setLocation}>
              {item.location}
            </Text>
          </View>
          <Text style={styles.location}>{moment(new Date(item.created_at)).endOf('hour').fromNow('')}</Text>
        </View>
        <View>
          {
            <S3Image
              level="protected"
              imgKey={item.image_url}
              style={styles.rectImg}
            />
          }
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        {data.length > 0 ? (
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={loaded}
          />
        ) : (
          <View
            style={{
              marginHorizontal: windowWidth * 0.03,
              marginVertical: windowHeight * 0.1,
            }}>
            <Image
              style={{
                height: windowHeight * 0.75,
                width: windowWidth * 0.9,
                justifyContent: 'center',
              }}
              source={require('../../assets/sharefirst.png')}></Image>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 0.5,
  },
  image: {
    height: 25,
    width: 30,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginVertical: 8,
    marginHorizontal: 5,
  },
  details: {
    color: '#646363',
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  rate: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
  },
  img2: {
    height: 60,
    width: 190,
  },
  icon: {
    height: 40,
    width: 40,
  },
  location: {
    color: '#7D7D7D',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 11,
  },
  rowDic: {
    flexDirection: 'row',
  },
  nameDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  rectImg: {
    height: 200,
    width: 400,
  },
  tittle: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 5,
  },
  content: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    padding: 12,
    textAlign: 'left',
  },
  namBack: {
    backgroundColor: '#2FCFE4',
    borderRadius: 99,
    height: 30,
    width: 30,
    marginVertical: 5,
  },
  textcol: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    margin: 3,
  },
});
export default CustomFlatList;

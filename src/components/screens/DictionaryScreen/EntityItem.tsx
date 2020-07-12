import {IEntity, IWord} from '../../../typings/IEntity';
import {Dimensions, StyleSheet, Text, View, Modal} from 'react-native';
import Tag, {Tags} from '../../common/Tag';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-looped-carousel';
import ContentWords from './ContentWords';
import ContentPhrases from './ContentPhrases';
import ContentSentences from './ContentSentences';
import {
  TouchableWithoutFeedback,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

interface IEntityItemProps {
  index: number;
  item: IEntity;
  section: {
    title: string;
    data: IEntity[];
  };
  separators: any;
}
const EntityItem = ({item}: IEntityItemProps) => {
  const [isFull, setIsFull] = useState(false);
  const mainWord = item.words.find((w) => w.en === item.title)!;
  const words = item.words.filter((w) => w.id !== mainWord.id);

  return (
    <View>
      <View>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => setIsFull(true)}>
            <Text style={styles.textEn}>{mainWord.en}</Text>
            <Tags
              style={styles.tag}
              type={mainWord.type}
              styleView={styles.tags}
            />
          </TouchableWithoutFeedback>
          <Icon
            name={isFull ? 'resize-100-' : 'resize-full-screen'}
            size={30}
            style={styles.resizeBtn}
            onPress={() => {
              console.log(isFull);
              setIsFull(true);
            }}
          />
        </View>
        <View>
          {mainWord.translate.map((t) => {
            return <Text>{t.ru}</Text>;
          })}
        </View>
      </View>
      <Modal
        presentationStyle={'overFullScreen'}
        onRequestClose={() => setIsFull(false)}
        onDismiss={() => setIsFull(false)}
        transparent={true}
        animationType={'slide'}
        visible={isFull}>
        <SafeAreaView style={{flex: 1}}>
          <Carousel
            autoplay={false}
            delay={1000}
            style={{width, flex: 1}}
            currentPage={1}
            isLooped={false}
            bullets
            bulletStyle={{borderColor: 'black'}}
            chosenBulletStyle={{backgroundColor: 'black'}}
            bulletsContainerStyle={{
              width: 90,
              left: width / 2 - 55,
              overflow: 'hidden',
              paddingRight: 10,
            }}
            onAnimateNextPage={(page) => {
              if (page === 0) {
                setIsFull(false);
              }
            }}>
            <View style={{flex: 1, backgroundColor: 'transparent'}} />
            <ContentWords key={'words'} words={words} />
            <ContentPhrases key={'phrases'} phrases={item.phrases} />
            <ContentSentences key={'sentences'} sentences={item.sentences} />
          </Carousel>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textEn: {
    fontSize: 22,
  },
  tags: {
    flexDirection: 'row',
    flex: 1,
  },
  tag: {
    margin: 2,
    padding: 0,
  },
  resizeBtn: {
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    margin: 8,
  },
});
export default EntityItem;

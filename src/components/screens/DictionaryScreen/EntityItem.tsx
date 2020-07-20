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
import {useTheme} from '../../../context/ThemeContext';
import {useScaleText} from 'react-native-text';

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
  const {backgroundColor, textColor, accent} = useTheme();
  const {fontSize: fsEn} = useScaleText({fontSize: 18});
  const {fontSize: fsRu} = useScaleText({fontSize: 15});
  const mainWord = item.words.find((w) => w.en === item.title)!;
  const words = item.words.filter((w) => w.id !== mainWord.id);

  const borderColor = textColor(0.6);
  return (
    <TouchableWithoutFeedback
      style={[
        styles.con,
        {
          backgroundColor: backgroundColor(0.02).toString(),
          borderBottomColor: borderColor.toString(),
        },
      ]}
      onPress={() => setIsFull(true)}>
      <View
        style={[
          styles.line,
          {
            backgroundColor: borderColor.fade(0.6).toString(),
          },
        ]}
      />
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor: accent().toString(),
              },
            ]}
          />
          <Text
            style={[
              styles.textEn,
              {
                fontSize: fsEn,
              },
            ]}>
            {mainWord.en}
          </Text>
          <Tags
            style={styles.tag}
            type={mainWord.type}
            styleView={styles.tags}
          />
        </View>
        <View>
          {mainWord.translate.map((t) => {
            return (
              <Text
                style={{
                  color: textColor(0.3).toString(),
                  fontSize: fsRu,
                }}>
                {t.ru}
              </Text>
            );
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    paddingLeft: 32,
  },
  line: {
    position: 'absolute',
    width: 0.5,
    top: 0,
    bottom: 0,
    left: 16,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 10,
    marginLeft: -22,
  },
  textEn: {
    paddingHorizontal: 8,
  },
  tags: {
    flexDirection: 'row',
  },
  tag: {
    margin: 2,
    padding: 0,
  },
  header: {
    paddingBottom: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default EntityItem;

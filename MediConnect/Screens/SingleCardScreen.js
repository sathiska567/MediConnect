import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

export default function SingleCardScreen() {
  const cardData = {
    image: '/api/placeholder/600/400',
    title: 'Card Title',
    descriptions: [
      {
        id: 1,
        label: 'Description 1',
        value: 'This is the first description of the card with detailed information.'
      },
      {
        id: 2,
        label: 'Description 2',
        value: 'This is the second description providing more details about the card.'
      },
      {
        id: 3,
        label: 'Description 3',
        value: 'This is the third description with additional information about the card.'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: cardData.image }}
              style={styles.image}
            />
            <View style={styles.imageOverlay} />
            <Text style={styles.overlayTitle}>{cardData.title}</Text>
          </View>

          {/* Card Content */}
          <View style={styles.cardContent}>
            {/* Description List */}
            <View style={styles.descriptionList}>
              {cardData.descriptions.map((item, index) => (
                <View 
                  key={item.id} 
                  style={[
                    styles.descriptionItem,
                    index === cardData.descriptions.length - 1 && styles.lastItem
                  ]}
                >
                  <View style={styles.labelContainer}>
                    <View style={styles.bullet} />
                    <Text style={styles.descriptionLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.descriptionValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.6, // Responsive height based on screen width
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlayTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardContent: {
    padding: 20,
  },
  descriptionList: {
    marginTop: 8,
  },
  descriptionItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lastItem: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  descriptionValue: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
    paddingLeft: 16,
  },
});
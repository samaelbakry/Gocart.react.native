import tw from "@/lib/tw";
import { Products } from "@/types/products";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    View
} from "react-native";

const { width } = Dimensions.get("window");

export default function ProductImageCarousel({
  itemDetails,
}: {
  itemDetails: Products;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(0.5)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <>
      <View style={tw`bg-white py-5 items-center justify-center`}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
        >
          {(itemDetails.images?.length
            ? itemDetails.images
            : [itemDetails.imageCover]
          ).map((img: string, index: number) => (
            <View
              key={index}
              style={{
                width: width,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!imageLoaded && (
                <Animated.View
                  style={[
                    tw`absolute inset-0 items-center justify-center rounded-xl`,
                    { opacity },
                  ]}
                >
                  <View
                    style={tw`w-50 h-50 rounded-2xl shadow bg-stone-100 shdow`}
                  />
                </Animated.View>
              )}
              <Image
                source={{ uri: img }}
                resizeMode="contain"
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: width * 0.8,
                  height: 280,
                }}
              />
            </View>
          ))}
        </ScrollView>

        {(itemDetails.images?.length ?? 0) > 1 && (
          <View style={tw`flex-row mt-4 justify-center items-center`}>
            {itemDetails.images.map((_: any, index: number) => (
              <View
                key={index}
                style={[
                  tw`mx-1 rounded-full`,
                  {
                    width: activeIndex === index ? 18 : 6,
                    height: 6,
                    backgroundColor:
                      activeIndex === index ? "#292524" : "#d6d3d1",
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </>
  );
}

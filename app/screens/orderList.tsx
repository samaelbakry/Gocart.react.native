import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useFetch } from '@/hooks/useFetch';
import { getLoggedUserOrders } from '@/services/orders';
import { useAppSelector } from '@/store/store';
import { selectedUser } from '@/store/slices/authSlice';
import { Order } from '@/types/orders';
import { OrderCard } from '@/components/orders/OrderCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OrderList() {
  const userId = useAppSelector(selectedUser)?.id || "";
  const router = useRouter()

  const { data, isLoading } = useFetch({
    queryFn: () => getLoggedUserOrders(userId),
    queryKey: ['userOrders', userId],
  });

  const rawOrders: Order[] = Array.isArray(data) ? data : data?.data || [];

  const sortedOrders = useMemo(() => {
    return [...rawOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [rawOrders]);


  const renderItem = useCallback(
    ({ item }: { item: Order }) => <OrderCard order={item} />,
    []
  );

  const keyExtractor = useCallback((item: Order) => item._id, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
    
      <View style={tw`px-4 pt-3 pb-3 border-b border-slate-100 flex-row gap-5 items-center`}>
        <TouchableOpacity onPress={()=>router.replace("/(tabs)/profile")} style={tw`size-8 shadow bg-stone-100 rounded-full flex-row items-center justify-center`}>
        <Ionicons name='arrow-back' size={20}/>
        </TouchableOpacity>
        <Text style={tw`text-xl font-extrabold text-slate-900 tracking-tight`}>
          My Orders
        </Text>
      </View>

      {isLoading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <FlatList
          data={sortedOrders}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={tw`p-4 ${sortedOrders.length === 0 ? 'flex-1 justify-center' : ''}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={tw`items-center justify-center p-8`}>
              <Text style={tw`text-base font-semibold text-slate-700`}>
                No orders found
              </Text>
            </View>
          }
          
        />
      )}
    </SafeAreaView>
  );
}
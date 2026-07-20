import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Order } from '@/types/orders';


interface OrderCardProps {
  order: Order;
  onPress?: (order: Order) => void;
  style?: StyleProp<ViewStyle>;
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const formatCurrency = (amount: number): string => {
  return `EGP ${amount.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })}`;
};

export const OrderCard: React.FC<OrderCardProps> = React.memo(({ order, onPress, style }) => {
  const itemCount = order.cartItems?.length || 0;
  const itemLabel = itemCount === 1 ? '1 Product' : `${itemCount} Products`;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => onPress?.(order)}
      style={[
        tw`bg-white rounded-2xl p-4 mb-4 border border-slate-100`,
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.03,
          shadowRadius: 10,
          elevation: 2,
        },
        style,
      ]}
    >
      <View style={tw`flex-row justify-between items-center pb-3 border-b border-slate-100 mb-3`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-base font-bold text-slate-900 tracking-tight`}>
            Order #{order.id}
          </Text>
        </View>

        <View style={tw`flex-row items-center`}>
          <Ionicons name="calendar-outline" size={14} color="#94A3B8" style={tw`mr-1`} />
          <Text style={tw`text-xs font-medium text-slate-500`}>
            {formatDate(order.createdAt)}
          </Text>
        </View>
      </View>

      <View style={tw`flex-row items-center gap-2 mb-3.5`}>
        <View
          style={tw`px-2.5 py-1 rounded-full ${
            order.isPaid ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <Text
            style={tw`text-xs font-semibold ${
              order.isPaid ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {order.isPaid ? 'Paid' : 'Pending'}
          </Text>
        </View>

        <View
          style={tw`px-2.5 py-1 rounded-full ${
            order.isDelivered ? 'bg-blue-50 border border-blue-200' : 'bg-slate-100 border border-slate-200'
          }`}
        >
          <Text
            style={tw`text-xs font-semibold ${
              order.isDelivered ? 'text-blue-700' : 'text-slate-600'
            }`}
          >
            {order.isDelivered ? 'Delivered' : 'Processing'}
          </Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between items-end mb-3.5 bg-slate-50 p-3 rounded-xl`}>
        <View>
          <Text style={tw`text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-0.5`}>
            Total Price
          </Text>
          <Text style={tw`text-base font-extrabold text-stone-800`}>
            {formatCurrency(order.totalOrderPrice)}
          </Text>
        </View>

        <View style={tw`items-start`}>
          <Text style={tw`text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-0.5`}>
            Payment
          </Text>
          <View style={tw`flex-row items-center`}>
            <Ionicons
              name={order.paymentMethodType === 'card' ? 'card-outline' : 'cash-outline'}
              size={14}
              color="#475569"
              style={tw`mr-1`}
            />
            <Text style={tw`text-xs font-bold text-slate-700 capitalize`}>
              {order.paymentMethodType}
            </Text>
          </View>
        </View>

        <View style={tw`items-end`}>
          <Text style={tw`text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-0.5`}>
            Items
          </Text>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="cube-outline" size={14} color="#475569" style={tw`mr-1`} />
            <Text style={tw`text-xs font-bold text-slate-700`}>{itemLabel}</Text>
          </View>
        </View>
      </View>

      <View style={tw`flex-row justify-between items-center pt-1`}>
        <View style={tw`flex-row items-center flex-1 mr-2`}>
          <Ionicons name="location-outline" size={15} color="#94A3B8" style={tw`mr-1`} />
          <Text style={tw`text-xs font-medium text-slate-500 capitalize`} numberOfLines={1}>
            {order.shippingAddress?.city || 'N/A'}
          </Text>
        </View>

        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-xs font-bold text-[#059669] mr-0.5`}>View Details</Text>
          <Ionicons name="chevron-forward" size={14} color="#059669" />
        </View>
      </View>
    </TouchableOpacity>
  );
});

OrderCard.displayName = 'OrderCard';
import BrandCard from "@/components/brands/BrandsCard";
import CategoriesCard from "@/components/categories/CategoriesCard";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/ui/Container";
import FilterList from "@/components/ui/FilterList";
import Header from "@/components/ui/Header";
import SkeletonList from "@/components/ui/SkeletonList";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { getBrands } from "@/services/getBrands";
import { getCategories } from "@/services/getCategories";
import { getAllProducts } from "@/services/getProduct";
import React, { useState } from "react";
import { FlatList } from "react-native";

export default function Home() {
  const [filter, setFilter] = useState<"all" | "brands" | "categories">("all");

  const { data: products, isPending: productsLoading } = useFetch({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
  });
  const { data: brands, isPending: brandLoading } = useFetch({
    queryFn: getBrands,
    queryKey: ["getAllBrands"],
  });
  const { data: categories, isPending: categoriesLoading } = useFetch({
    queryFn: getCategories,
    queryKey: ["getAllCategories"],
  });

  return (
    <Container style={{ flex: 1 }}>
      <FilterList value={filter} onChange={setFilter} />
      {filter === "all" && (
        <>
          <Header
            heading="The Full"
            primaryText="Collection"
            subText="Every piece, every house, one catalog — curated for those who notice the details."
          />

          {productsLoading ? (
            <SkeletonList />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={tw`gap-4 px-5`}
              contentContainerStyle={tw`pt-6 pb-10`}
              renderItem={({ item, index }) => (
                <ProductCard item={item} index={index} />
              )}
            />
          )}
        </>
      )}

      {filter === "brands" && (
        <>
          <Header
            heading="Houses of"
            primaryText="Design"
            subText="Discover global and local houses shaping contemporary aesthetics,architecture, and craftsmanship."
          />

          {brandLoading ? (
            <SkeletonList />
          ) : (
            <FlatList
              data={brands}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={tw`gap-4 px-5`}
              contentContainerStyle={tw`pt-6 pb-10`}
              renderItem={({ item, index }) => (
                <BrandCard item={item} index={index} />
              )}
            />
          )}
        </>
      )}
      {filter === "categories" && (
        <>
          <Header
            heading="Department"
            primaryText="Indices"
            subText="Browse through unified taxonomic archives partitioned by utility, material essence, and structural intent.."
          />

          {categoriesLoading ? (
            <SkeletonList />
          ) : (
            <FlatList
              data={categories}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={tw`gap-4 px-5`}
              contentContainerStyle={tw`pt-6 pb-10`}
              renderItem={({ item, index }) => (
                <CategoriesCard item={item} index={index} />
              )}
            />
          )}
        </>
      )}
    </Container>
  );
}

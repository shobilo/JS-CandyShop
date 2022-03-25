import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createBrand, createProperty, createType, deleteBrand, deleteProperty, deleteType, readAllBrands, readAllFiltersData, readAllProperties, readAllTypes, updateBrand, updateProperty, updateType } from "./filtersDataActionCreators";

const initialState = {
  types: [],
  brands: [],
  properties: [],
  isLoading: false,
  error: "",
};

const filtersDataSlice = createSlice({
  name: 'filtersData',
  initialState,
  reducers: {
    resetFiltersData: (state) => {
      state.types = []
      state.brands = []
      state.properties = []
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createBrand.fulfilled, (state, action) => {
      state.brands.push(action.payload)
    })
    .addCase(createType.fulfilled, (state, action) => {
      state.types.push(action.payload)
    })
    .addCase(createProperty.fulfilled, (state, action) => {
      state.properties.push(action.payload)
    })
    .addCase(readAllTypes.fulfilled, (state, action) => {
      state.types = action.payload
    })
    .addCase(readAllBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
    .addCase(readAllProperties.fulfilled, (state, action) => {
      state.properties = action.payload
    })
    .addCase(readAllFiltersData.fulfilled, (state, action) => {
      state.brands = action.payload.brands
      state.types = action.payload.types
      state.properties = action.payload.properties
    })
    .addCase(updateBrand.fulfilled, (state, action) => {
      state.brands.find((brand) => brand.id === action.payload.id).name = action.payload.name
    })
    .addCase(updateType.fulfilled, (state, action) => {
      state.types.find((type) => type.id === action.payload.id).name = action.payload.name
    })
    .addCase(updateProperty.fulfilled, (state, action) => {
      const changedProperty = state.properties.find((property) => property.id === action.payload.id)
      for (const item in changedProperty) {
        changedProperty[item] = action.payload[item]
      }
    })
    .addCase(deleteBrand.fulfilled, (state, action) => {
      state.brands = state.brands.filter((brand) => brand.id !== action.payload)
    })
    .addCase(deleteType.fulfilled, (state, action) => {
      state.types = state.types.filter((type) => type.id !== action.payload)
    })
    .addCase(deleteProperty.fulfilled, (state, action) => {
      state.properties = state.properties.filter((property) => property.id !== action.payload)
    })
    .addMatcher(
      isAnyOf(
        readAllBrands.pending,
        readAllTypes.pending,
        readAllProperties.pending,
        readAllFiltersData.pending,
        updateBrand.pending,
        updateType.pending,
        updateProperty.pending,
        deleteBrand.pending,
        deleteType.pending,
        deleteProperty.pending,
      ),
      (state) => {
        state.error = "";
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(
        readAllBrands.fulfilled,
        readAllTypes.fulfilled,
        readAllProperties.fulfilled,
        readAllFiltersData.fulfilled,
        updateBrand.fulfilled,
        updateType.fulfilled,
        updateProperty.fulfilled,
        deleteBrand.fulfilled,
        deleteType.fulfilled,
        deleteProperty.fulfilled,
      ),
      (state) => {
        state.error = "";
        state.isLoading = false;
      }
    )
    .addMatcher(
      isAnyOf(
        readAllBrands.rejected,
        readAllTypes.rejected,
        readAllProperties.rejected,
        readAllTypes.rejected,
        updateBrand.rejected,
        updateType.rejected,
        updateProperty.rejected,
        deleteBrand.rejected,
        deleteType.rejected,
        deleteProperty.rejected,
      ),
      (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    )
  }
})

export const { resetFiltersData } = filtersDataSlice.actions
export default filtersDataSlice.reducer
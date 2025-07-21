import { fetchMonthlyData } from "./InputData.js";

// ✅ Dynamic category fetcher by category name
const getCategoryDataByName = async (categoryName) => {
  const inputData = await fetchMonthlyData(2);
  const TotalBudget = inputData.TotalBudget || 0;

  // Find category object by name (case insensitive)
  const category = inputData.expence?.find(
    (cat) => cat.category?.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) {
    return { listing: [], total: 0, percentage: 0, TotalBudget };
  }

  const categoryItems = category.items || {};

  // Sum of prices
  const total = Object.values(categoryItems).reduce((sum, item) => {
    return sum + (Number(item?.price) || 0);
  }, 0);

  // Detailed item listing with % of category
  const listing = Object.entries(categoryItems).map(([key, item]) => ({
    name: item.name,
    value: item.price,
    percentage: total > 0 ? (item.price / total) * 100 : 0,
  }));

  // % of overall budget
  const percentage = TotalBudget > 0 ? (total / TotalBudget) * 100 : 0;

  return {
    listing,
    total,
    percentage,
    TotalBudget,
  };
};

// ✅ Exports per category using dynamic lookup
export const ForthFoodExpence = async () => {
  const { listing: Foodlist, total: foodExpence, percentage: Foodpercentage, TotalBudget } =
    await getCategoryDataByName("food");
  return { Foodlist, foodExpence, Foodpercentage, TotalBudget };
};

export const ForthTransportExpence = async () => {
  const { listing: TransportListing, total: transportExpence, percentage: TransportPercentage } =
    await getCategoryDataByName("transport");
  return { TransportListing, transportExpence, TransportPercentage };
};

export const ForthPersonalExpence = async () => {
  const { listing: PersonalListing, total: personalExpence, percentage: Personal_percentage } =
    await getCategoryDataByName("personal");
  return { PersonalListing, personalExpence, Personal_percentage };
};

export const ForthHousingExpence = async () => {
  const { listing: HousingListing, total: housingExpence, percentage: Housing_percentage } =
    await getCategoryDataByName("housing");
  return { HousingListing, housingExpence, Housing_percentage };
};

export const ForthSavingExpence = async () => {
  const { listing: SavingListing, total: savingExpence, percentage: Saving_percentage } =
    await getCategoryDataByName("saving");
  return { SavingListing, savingExpence, Saving_percentage };
};

// ✅ Total Expence Summary
export const ForthTotalExpence = async () => {
  const inputData = await fetchMonthlyData(2);
  const TotalBudget = inputData.TotalBudget || 0;
  const Expences = inputData.expence ?? [];

  const Spended = Expences.reduce((sum, category) => {
    const values = Object.values(category.items || {}).map((obj) => obj.price || 0);
    const categoryTotal = values.reduce((catSum, val) => catSum + val, 0);
    return sum + categoryTotal;
  }, 0);

  const TotalExpence_percentage = TotalBudget > 0 ? (Spended / TotalBudget) * 100 : 0;
  const AverageExpence = Spended / 5;

  return { TotalBudget, TotalExpence_percentage, Spended, AverageExpence };
};

// ✅ Date Accessor
export const ForthDate = async () => {
  const data = await fetchMonthlyData(2);
  return data.date;
};

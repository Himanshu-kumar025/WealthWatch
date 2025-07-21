import axios from "axios";
import { BASE_URL } from "../axiosConfig.js";

export const fetchMonthlyData = async (monthIndex) => {
  try {
    const token = localStorage.getItem("token");

    // Make a GET request to fetch all data
    const response = await axios.get(`${BASE_URL}/alldata`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    // Access the Monthly array from the response
    const monthlyData = response.data[0]?.Monthly ?? [];

    // // Validate the month index to prevent out-of-bounds access
    // if (monthIndex < 0 || monthIndex >= monthlyData.length) {
    //   throw new Error("Invalid month index");
    // }

    // Extract data for the specified month
    const data = monthlyData[monthIndex];

    // Extract the raw date from the first expense item
    const rawDate = data?.expence?.[0]?.items?.[0]?.date ?? null;

    // Convert raw date to month number (1-based)
    const date = rawDate ? new Date(rawDate).getMonth() + 1 : null;

    // Return the structured monthly data
    return {
      monthName: data?.month ?? "",
      TotalBudget: data?.totalBudget ?? 0,
      expence: data?.expence ?? [],
      date: date,
    };
  } catch (error) {
    // Log any errors and return a fallback structure
    console.error("Failed to fetch monthly data:", error);
    return {
      TotalBudget: 0,
      expence: [],
      date: null,
    };
  }
};


export const fetchProfileFromBackend = async () => {
  try {
    // Send request to get user profile data
    const response = await axios.get(`${BASE_URL}/getUserProfile`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    // Extract total income from the form data
    const TotalBudget = response?.data?.formData.income;

    return TotalBudget;
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error while fetching goals:", error.message);
  }
};

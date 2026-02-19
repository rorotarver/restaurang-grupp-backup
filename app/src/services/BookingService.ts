const createRestaurant = async () => {
  const response = await fetch(
    "https://school-restaurant-api.azurewebsites.net/api/restaurant/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Fantastic Food",
        address: {
          street: "Fantastic Street 123",
          city: "Stockholm",
          zip: "12345",
        },
      }),
    },
  );

  const data = await response.json();
  console.log(data);

  const restaurantId = data.id;
  console.log("Restaurant ID:", restaurantId);
};

createRestaurant();

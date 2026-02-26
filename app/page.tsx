'use client';


import LandingPage from "./src/LandingPageComponents/LandingPage";


// Det här vårat id till api:et 6996f44b1f79230601108db6

export default function Home() {
  const createRestaurant = async () => {
    const response = await fetch(
      "https://school-restaurant-api.azurewebsites.net/restaurant/create",
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

  
  // Bara för att testa bokningsflödet, kan tas bort när det är klart
  
  return (
    <div className="w-full min-h-screen">
      <button onClick={createRestaurant}>Skapa</button>
      <LandingPage />
    </div>
  );
}

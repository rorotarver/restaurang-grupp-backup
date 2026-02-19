"use client";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button onClick={createRestaurant}>Skapa</button>
      </main>
    </div>
  );
}

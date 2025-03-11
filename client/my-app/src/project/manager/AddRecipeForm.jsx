import axios from "axios";
import React, { useState } from "react";
// const meatRecipes = [
//   {
//     image: "/uploads/araes.jpeg",
//     publishDate: "2025-01-22",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 30,
//     ingredients: ["בשר טחון", "לחם פיתה", "פטרוזיליה", "תבלינים"],
//     preparationSteps: ["למלא את הפיתה בבשר מתובל", "לצלות על הגריל"],
//     finalYield: "2 מנות",
//     likes: 25,
//   },
//   {
//     image: "/uploads/burger.jpeg",
//     publishDate: "2025-01-23",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 40,
//     ingredients: ["בשר טחון", "לחמנייה", "עגבנייה", "חסה"],
//     preparationSteps: ["להכין קציצת בשר", "לטגן ולהרכיב המבורגר בלחמנייה"],
//     finalYield: "2 מנות",
//     likes: 40,
//   },
//   {
//     image: "/uploads/moussaka.jpeg",
//     publishDate: "2025-01-24",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 90,
//     ingredients: ["בשר טחון", "חציל", "בצל", "תבלינים"],
//     preparationSteps: ["לטגן חציל ובצל", "להוסיף את הבשר", "לבשל בתנור"],
//     finalYield: "4 מנות",
//     likes: 55,
//   },
//   {
//     image: "/uploads/steak_and_fries.jpeg",
//     publishDate: "2025-01-25",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 60,
//     ingredients: ["סטייק אנטריקוט", "תפוחי אדמה", "שום", "רוזמרין"],
//     preparationSteps: ["לתבל את הסטייק", "לאפות תפוחי אדמה בתנור"],
//     finalYield: "3 מנות",
//     likes: 70,
//   },
//   {
//     image: "/uploads/beef_shoulder.jpeg",
//     publishDate: "2025-01-26",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 120,
//     ingredients: ["צלי בקר", "תפוחי אדמה", "גזר", "תבלינים"],
//     preparationSteps: ["להוסיף את כל החומרים לתנור", "לבשל במשך שעות"],
//     finalYield: "6 מנות",
//     likes: 60,
//   },
//   {
//     image: "/uploads/striploin_stirfry.jpeg",
//     publishDate: "2025-01-27",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 50,
//     ingredients: ["רצועת אנטריקות", "פטריות", "גזר", "תבלינים"],
//     preparationSteps: ["לטגן את הרצועות", "להוסיף את הירקות ולהגיש"],
//     finalYield: "4 מנות",
//     likes: 35,
//   },
//   {
//     image: "/uploads/moroccan_fish.jpeg",
//     publishDate: "2025-01-28",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 60,
//     ingredients: ["דג (לברק)", "תבלינים מרוקאים", "ירקות", "חומוס"],
//     preparationSteps: ["לבשל את הדג עם התבלינים", "להוסיף את הירקות ולבשל עד רכות"],
//     finalYield: "3 מנות",
//     likes: 80,
//   },
//   {
//     image: "/uploads/kubeh.jpeg",
//     publishDate: "2025-01-29",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 75,
//     ingredients: ["בשר טחון", "חומוס", "תבלינים", "פרסליה"],
//     preparationSteps: ["למלא את הקובה במילוי בשר", "לטגן את הקובות עד חום יפה"],
//     finalYield: "5 מנות",
//     likes: 50,
//   },
//   {
//     image: "/uploads/chicken_stuffed.jpeg",
//     publishDate: "2025-01-30",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 90,
//     ingredients: ["חזה עוף", "תפוחי אדמה", "ירקות", "תבלינים"],
//     preparationSteps: ["למלא את חזה העוף עם תערובת ירקות", "לאפות בתנור"],
//     finalYield: "4 מנות",
//     likes: 45,
//   },
//   {
//     image: "/uploads/chicken_strips_with_pasta.jpeg",
//     publishDate: "2025-01-31",
//     categoryCode: "679215da728744aafe74dfc4",
//     preparationTime: 60,
//     ingredients: ["רצועות חזה עוף", "פתיתים", "רוטב עגבניות", "תבלינים"],
//     preparationSteps: ["לטגן את רצועות החזה עוף", "לבשל פתיתים עם הרוטב", "להגיש יחד"],
//     finalYield: "5 מנות",
//     likes: 70,
//   },
// ];
// const meatRecipes = [
//   {
//     image: "/uploads/pizza.jpeg",
//     publishDate: "2025-01-22",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 45,
//     ingredients: ["קמח", "שמרים", "גבינת מוצרלה", "רוטב פיצה", "עגבניות"],
//     preparationSteps: ["לערבב את החומרים לבצק", "למרוח רוטב על הבצק", "לאפות בתנור"],
//     finalYield: "4 מנות",
//     likes: 30,
//   },
//   {
//     image: "/uploads/khachapuri.jpeg",
//     publishDate: "2025-01-23",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 60,
//     ingredients: ["קמח", "גבינת קוטג'", "חמאה", "ביצה"],
//     preparationSteps: ["ללוש את הבצק", "למלא בגבינה ולהשאיר מקום לארוחה", "לאפות עד הזהבה"],
//     finalYield: "4 מנות",
//     likes: 40,
//   },
//   {
//     image: "/uploads/pastida.jpeg",
//     publishDate: "2025-01-24",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 70,
//     ingredients: ["קמח", "ביצים", "גבינות", "ירקות"],
//     preparationSteps: ["לערבב את החומרים", "לאפות בתבנית עד שיהיה חמים ומפולג"],
//     finalYield: "6 מנות",
//     likes: 50,
//   },
//   {
//     image: "/uploads/ziva.jpeg",
//     publishDate: "2025-01-25",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 50,
//     ingredients: ["קמח", "תפוחי אדמה", "גבינות צהובות", "תיבול"],
//     preparationSteps: ["לערבב את הקמח והתפוחי אדמה", "להכין את הזיווה ולשים בתנור"],
//     finalYield: "4 מנות",
//     likes: 60,
//   },
//   {
//     image: "/uploads/pizza_pesto.jpeg",
//     publishDate: "2025-01-26",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 50,
//     ingredients: ["קמח", "רוטב פסטו", "גבינת מוצרלה", "עגבניות"],
//     preparationSteps: ["למזוג את הפסטו על הבצק", "למלא בגבינה ועגבניות", "לאפות"],
//     finalYield: "4 מנות",
//     likes: 55,
//   },
//   {
//     image: "/uploads/lasagna.jpeg",
//     publishDate: "2025-01-27",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 90,
//     ingredients: ["פסטה", "גבינות", "רוטב בולונז", "בצל"],
//     preparationSteps: ["לסדר את הפסטה עם רוטב", "להוסיף את הגבינות ולבשל בתנור"],
//     finalYield: "6 מנות",
//     likes: 70,
//   },
//   {
//     image: "/uploads/cheese_and_vegetables_platter.jpeg",
//     publishDate: "2025-01-28",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 20,
//     ingredients: ["גבינות", "עגבניות", "מלפפונים", "תיבול"],
//     preparationSteps: ["לסדר את הגבינות והירקות בצלחת", "לתבל ולהגיש"],
//     finalYield: "4 מנות",
//     likes: 80,
//   },
//   {
//     image: "/uploads/margarita_pizza.jpeg",
//     publishDate: "2025-01-29",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 45,
//     ingredients: ["קמח", "גבינת מוצרלה", "רוטב פיצה", "בזיליקום"],
//     preparationSteps: ["למלא את הבצק עם רוטב וגבינה", "לאפות בתנור עד שהיא מתפשטת"],
//     finalYield: "4 מנות",
//     likes: 90,
//   },
//   {
//     image: "/uploads/gnocchi_with_cream_mushroom_sauce.jpeg",
//     publishDate: "2025-01-30",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 60,
//     ingredients: ["ניוקי", "שמנת", "פטריות", "בצל"],
//     preparationSteps: ["לבשל את הניוקי", "לטגן את הפטריות עם שמנת ולהגיש"],
//     finalYield: "4 מנות",
//     likes: 75,
//   },
//   {
//     image: "/uploads/pasta_with_cream_mushroom_sauce.jpeg",
//     publishDate: "2025-01-31",
//     categoryCode: "679215ef728744aafe74dfc6",
//     preparationTime: 45,
//     ingredients: ["פסטה", "שמנת", "פטריות", "בצל"],
//     preparationSteps: ["לבשל את הפסטה", "לטגן את הפטריות עם שמנת", "לשלב את הפסטה עם הרוטב"],
//     finalYield: "4 מנות",
//     likes: 85,
//   },
// ];

const meatRecipes = [
  {
    image: "/uploads/chicken_on_the_planch.jpeg",
    publishDate: "2025-01-22",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 30,
    ingredients: ["חזה עוף", "שום", "שמן זית", "רוטב סויה"],
    preparationSteps: ["לחמם את הפלנצה", "לתבל את חזה העוף עם שום ורוטב סויה", "לטגן על הפלנצה עד שהעוף מוכן"],
    finalYield: "2 מנות",
    likes: 40,
  },
  {
    image: "/uploads/spicy_asian_noodles.jpeg",
    publishDate: "2025-01-23",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 40,
    ingredients: ["נודלס", "שום", "רוטב סויה", "פפריקה חריפה", "ג'ינג'ר"],
    preparationSteps: ["לבשל את הנודלס", "לטגן שום וג'ינג'ר", "להוסיף את הרוטב החריף והנודלס", "לבשל עד שהטעמים מתמזגים"],
    finalYield: "3 מנות",
    likes: 45,
  },
  {
    image: "/uploads/noodles_with_mushrooms.jpeg",
    publishDate: "2025-01-24",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 35,
    ingredients: ["נודלס", "פטריות", "שום", "רוטב סויה", "שמן שומשום"],
    preparationSteps: ["לבשל את הנודלס", "לטגן פטריות עם שום ושמן שומשום", "לשלב את הנודלס עם הפטריות והרוטב"],
    finalYield: "4 מנות",
    likes: 50,
  },
  {
    image: "/uploads/noodles_with_truffles.jpeg",
    publishDate: "2025-01-25",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 50,
    ingredients: ["נודלס", "כמהין", "שום", "שמן זית"],
    preparationSteps: ["לבשל את הנודלס", "לטגן את השום והשמן", "להוסיף את כמהין פרוסות ולהגיש עם הנודלס"],
    finalYield: "4 מנות",
    likes: 60,
  },
  {
    image: "/uploads/antipasti.jpeg",
    publishDate: "2025-01-26",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 40,
    ingredients: ["חצילים", "פטריות", "עגבניות מיובשות", "זיתים", "רוזמרין"],
    preparationSteps: ["לצלות את החצילים והפטריות", "לסדר את כל המרכיבים על צלחת ולהגיש"],
    finalYield: "6 מנות",
    likes: 55,
  },
  {
    image: "/uploads/sweet_and_sour_chicken.jpeg",
    publishDate: "2025-01-27",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 45,
    ingredients: ["חזה עוף", "רוטב סויה", "חומץ אורז", "סוכר", "שום"],
    preparationSteps: ["לטגן את חזה העוף", "להכין את הרוטב עם החומץ והסוכר", "לשלב את העוף עם הרוטב החמוץ-חריף"],
    finalYield: "4 מנות",
    likes: 65,
  },
  {
    image: "/uploads/ginger_chicken_stirfry.jpeg",
    publishDate: "2025-01-28",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 30,
    ingredients: ["חזה עוף", "ג'ינג'ר", "רוטב סויה", "ירקות"],
    preparationSteps: ["לטגן את העוף עם ג'ינג'ר ושום", "להוסיף את הירקות ולטגן יחד עד רכות"],
    finalYield: "3 מנות",
    likes: 75,
  },
  {
    image: "/uploads/vegan_noodles_with_peanut_sauce.jpeg",
    publishDate: "2025-01-29",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 40,
    ingredients: ["נודלס", "חמאת בוטנים", "שום", "רוטב סויה", "סוכר חום"],
    preparationSteps: ["לבשל את הנודלס", "להכין רוטב חמאת בוטנים עם סויה ושום", "לשלב את הנודלס עם הרוטב"],
    finalYield: "4 מנות",
    likes: 80,
  },
  {
    image: "/uploads/spicy_vegetable_noodles.jpeg",
    publishDate: "2025-01-30",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 30,
    ingredients: ["נודלס", "גזר", "קישוא", "פפריקה חריפה", "רוטב סויה"],
    preparationSteps: ["לטגן את הירקות עם הפפריקה", "לבשל את הנודלס", "להוסיף את הנודלס והירקות עם הרוטב"],
    finalYield: "3 מנות",
    likes: 90,
  },
  {
    image: "/uploads/tuna_tartare.jpeg",
    publishDate: "2025-01-31",
    categoryCode: "67921641728744aafe74dfc8",
    preparationTime: 20,
    ingredients: ["טונה טרייה", "שמן זית", "סויה", "אבוקדו", "בצל ירוק"],
    preparationSteps: ["לחתוך את הטונה לקוביות קטנות", "לסחוט את הלימון ולהוסיף סויה ושמן זית", "לשלב עם האבוקדו והבצל הירוק", "להגיש כטרטר"],
    finalYield: "2 מנות",
    likes: 95,
  },
];



const AddRecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    publishDate: "",
    categoryCode: "",
    preparationTime: "",
    ingredients: [],
    preparationSteps: [],
    finalYield: "",
    likes: "",
  });

  const [image, setImage] = useState(null);
  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");

  const handleChange = (e) => {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setRecipeData({
        ...recipeData,
        ingredients: [...recipeData.ingredients, ingredientInput.trim()],
      });
      setIngredientInput("");
    }
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setRecipeData({
        ...recipeData,
        preparationSteps: [...recipeData.preparationSteps, stepInput.trim()],
      });
      setStepInput("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();

    formData.append("image", image); // ודא ששדה זה מוגדר כ"image"
    formData.append("publishDate", meatRecipes[9].publishDate);
    formData.append("categoryCode", meatRecipes[9].categoryCode);
    formData.append("preparationTime", meatRecipes[9].preparationTime);
    formData.append("ingredients", JSON.stringify(meatRecipes[9].ingredients));
    formData.append("preparationSteps", JSON.stringify(meatRecipes[9].preparationSteps));
    formData.append("finalYield", meatRecipes[9].finalYield);
    formData.append("likes", meatRecipes[9].likes);

    // הדפסת הנתונים לבדיקה
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // זה צריך להדפיס את שם השדה והערך, כולל תמונה
    }

    try {
      formData.forEach(data => console.log(data)
      )
      console.log('form-data', formData);

      const response = await axios.post("http://localhost:3000/recipes", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.data;
      if (response.status === 200) {
        alert("Recipe added successfully!");
        setRecipeData({
          publishDate: "",
          categoryCode: "",
          preparationTime: "",
          ingredients: [],
          preparationSteps: [],
          finalYield: "",
          likes: "",
        });
        setImage(null);
      } else {
        alert("Failed to add recipe: " + result.error);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("An error occurred while adding the recipe.");
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Recipe Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <div>
          <label>Publish Date:</label>
          <input type="date" name="publishDate" value={recipeData.publishDate} onChange={handleChange}  />
        </div>
        <div>
          <label>Category Code:</label>
          <input type="text" name="categoryCode" value={recipeData.categoryCode} onChange={handleChange}  />
        </div>
        <div>
          <label>Preparation Time (minutes):</label>
          <input type="number" name="preparationTime" value={recipeData.preparationTime} onChange={handleChange}  />
        </div>
        <div>
          <label>Ingredients:</label>
          <input type="text" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
          <ul>
            {recipeData.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Preparation Steps:</label>
          <input type="text" value={stepInput} onChange={(e) => setStepInput(e.target.value)} />
          <button type="button" onClick={addStep}>Add Step</button>
          <ul>
            {recipeData.preparationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Final Yield:</label>
          <input type="text" name="finalYield" value={recipeData.finalYield} onChange={handleChange}  />
        </div>
        <div>
          <label>Likes:</label>
          <input type="number" name="likes" value={recipeData.likes} onChange={handleChange} />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;

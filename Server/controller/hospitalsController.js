const axios = require('axios')

const hospitalsController = async (req, res) => {
        try {
          const data = await axios.get("https://www.communitybenefitinsight.org/api/get_hospitals.php?state=NC");
          const hospitals = data.data; // assuming data.data is an array
          const firstSixHospitals = hospitals.slice(0, 6);
      
          // Define a list of image URLs to assign to hospitals
          const hospitalImages = [
            "https://missionrmc.org/wp-content/uploads/2022/12/hospitals-image.jpg",
            "https://i0.wp.com/www.northcarolinahealthnews.org/wp-content/uploads/2018/04/130327_HPR_SignReveal_Web.jpg?resize=800%2C600&ssl=1",
            "https://www.adams-electric.com/sites/default/files/styles/big/public/IMG_1001.JPG?itok=zFHXtOns",
            "https://www.sdmmag.com/ext/resources/SDM-Tech-at-Wok/aitx-rad-scotland-memorial-hospital.jpg?t=1693232015&width=696",
            "https://www.wmh.org/wp-content/uploads/2017/11/6-17-16-8.jpg",
            "https://i0.wp.com/carolinapublicpress.org/wp-content/uploads/2017/09/Asheville_HuffPost02-1.jpg?resize=780%2C519&ssl=1"
          ];
      
          // Add an image to each hospital in the array, cycling through the image URLs
          const hospitalsWithImages = firstSixHospitals.map((hospital, index) => {
            return {
              ...hospital, // Keep existing hospital data
              image: hospitalImages[index] || "https://default-image-url.com" // Default image in case we run out of predefined images
            };
          });
      
          res.status(200).send({
            success: true,
            data: hospitalsWithImages // Return the updated hospitals data with image
          });
      
        } catch (error) {
          res.status(400).send({
            success: false,
            message: error.message
          });
        }
      };
      


module.exports = {hospitalsController}
import express from 'express';

const app = express();
app.use(express.json());

const MOBILES = [
    { id: 1, name: "iPhone 15 Pro", price: 1299 },
    { id: 2, name: "Samsung Galaxy S23 Ultra", price: 1199 },
    { id: 3, name: "OnePlus 11", price: 699 },
    { id: 4, name: "Google Pixel 8 Pro", price: 999 },
    { id: 5, name: "Xiaomi 13 Pro", price: 899 },
    { id: 6, name: "Oppo Find X6 Pro", price: 899 },
    { id: 7, name: "Sony Xperia 1 V", price: 1199 },
    { id: 8, name: "Realme GT 5 Pro", price: 649 },
    { id: 9, name: "Vivo X90 Pro+", price: 1099 },
    { id: 10, name: "Asus ROG Phone 7", price: 999 },
];

app.get("/mobiles", (req, res) => {

    const { price } = req.query;;

    const filterMobiles = MOBILES.filter((mobile) => {
        if (!price) {
            return true;
        }
        if (mobile.price == price) {
            return true;
        }
    })

    res.json({
        success: true,
        data: filterMobiles,
        message: "Mobile data fetched successfully"
    })
})


app.get("/mobiles/:id", (req, res) => {
    const {id} = req.params

    const mobile = MOBILES.find((mob) => {
        if (mob.id == id) {
            return true;
        }
    })

    if (!mobile){
        return res.json({
            success: false,
            data: null,
            message: "Mobile not found"
        })
    }

    res.json({
        success: true,
        data: mobile,
        message: "Mobile data fetched successfully"
    })
})


app.post("/mobiles", (req, res)=>{
    const {id, name, price} = req.body;

    const mobile = {
        id,
        name,
        price
    }

    MOBILES.push(mobile)

    res.json({
        success: true,
        data: mobile,
        message: "mobile added successfully"
    })
})


app.delete("/mobiles/:id", (req, res)=> {
    const {id} = req.params;
    let mobileIndex = -1;

    MOBILES.map((mob, index)=> {
        if(mob.id == id) {
            mobileIndex = index;
        }
    });


    if(mobileIndex == -1) {
        return res.json({
            success: "false",
            message: "mobile not found"
        });
    }

    MOBILES.splice(mobileIndex, 1);
    res.json({
        success: "true",
        message: "student deleted successfully"
    });
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
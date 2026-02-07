# 🍃 MongoDB Setup Guide

Ab aapka server ready hai MongoDB se connect karne ke liye!

## 1. MongoDB Connection String Layen
Agar aapke paas MongoDB URL nahi hai, toh yahan se free wala banayein:
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) par account banayein.
2. Naya **Cluster** create karein (Free tier).
3. **Database Access** mein ek user banayein (username/password yaad rakhein).
4. **Network Access** mein "Allow Access from Anywhere" (0.0.0.0/0) add karein.
5. **Connect** button dabayein -> "Drivers" -> URL copy karein.
   - URL kuch aisa dikhega: `mongodb+srv://<username>:<password>@cluster0.rx89.mongodb.net/?retryWrites=true&w=majority`

## 2. .env File Update Karein
Apne project folder mein `.env` file ko open karein aur ye line update karein:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster0... (jo aapne copy kiya)
```
*(Make sure `<password>` ko apne asli password se replace karein!)*

## 3. Server Restart Karein
Changes apply karne ke liye server band karke wapas start karein:
- **Option 1**: `start-server.bat` pe double-click karein.
- **Option 2**: Terminal mein `npm run server` chalayein.

Jab connect ho jayega, terminal mein likha aayega:
✅ **Connected to MongoDB Successfully!**

Ab aapka data hamesha save rahega, chahe PC restart karein! 🚀

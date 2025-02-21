import express, {Router} from 'express';

const router = Router();

const chats = [
    { _id: 1, name: "Chat with Dove" },
    { _id: 2, name: "Chat with bae😍" },
];

router.get("/" , (req, res) => {
    res.json(chats);
})

export default router;
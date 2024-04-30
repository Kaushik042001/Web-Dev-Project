import React, { useRef, useState, useEffect } from 'react';
import { firestore } from '../Firebase/firebase';
import { addDoc, collection, getDocs } from '@firebase/firestore';

export default function Home() {
    const messageRef = useRef();
    const ref = collection(firestore, "text");
    const [text, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(ref);
                const fetchedMessages = [];
                querySnapshot.forEach((doc) => {
                    fetchedMessages.push({ id: doc.id, ...doc.data() });
                });
                setMessages(fetchedMessages);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [ref]);

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            message: messageRef.current.value,
        };

        try {
            await addDoc(ref, data);
            messageRef.current.value = ''; 
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSave}>
                <input type="text" ref={messageRef} />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {text.map((message) => (
                        <li key={message.id}>{message.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
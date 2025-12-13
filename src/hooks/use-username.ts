import { useState , useEffect } from "react";
import { nanoid } from "nanoid";



const Animals = [
    'Lion', 'Tiger', 'Bear', 'Wolf', 'Eagle', 'Shark', 'Panther', 'Leopard',
    'Cheetah', 'Falcon', 'Hawk', 'Fox', 'Rabbit', 'Deer', 'Moose', 'Bison',
  ];
  
  const StorageKey = 'ghostchat-username';
  
  const generateUsername = () => {
    const word = Animals[Math.floor(Math.random() * Animals.length)];
    return `anonymous-${word.toLowerCase()}-${nanoid(5)}`;
  };

export const useUsername = ({isOpen}) => {

     const [username, setUsername] = useState('');

     useEffect(() => {
        // Only run logic if modal is actually open to save resources
        if (!isOpen) return; 
    
        const main = () => {
          const storedName = localStorage.getItem(StorageKey);
          if (storedName) {
            setUsername(storedName);
            return;
          }
          const generated = generateUsername();
          localStorage.setItem(StorageKey, generated);
          setUsername(generated);
        };
        main();
      }, [isOpen]);

      return {username}
}
const levels = {
    "fruits-1": {
      difficulty: 'basic', // Básico
      data: [ 
        { id: 1, english: "lime", spanish: "limón", meaning: "A small green citrus fruit", sentenceEn: "I add lime to my water.", sentenceEs: "Añado limón a mi agua." },
        { id: 2, english: "coconut", spanish: "coco", meaning: "A large brown tropical fruit", sentenceEn: "She drinks coconut water.", sentenceEs: "Ella bebe agua de coco." },
        { id: 3, english: "strawberry", spanish: "fresa", meaning: "A small red fruit", sentenceEn: "I like strawberry ice cream.", sentenceEs: "Me gusta el helado de fresa." },
        { id: 4, english: "mango", spanish: "mango", meaning: "A sweet tropical fruit", sentenceEn: "We eat mango in summer.", sentenceEs: "Comemos mango en verano." },
      ],
    },
    "fruits-2": {
      difficulty: 'medium',
      data: [
      { id: 1, english: "apple", spanish: "manzana", meaning: "A round fruit", sentenceEn: "I eat an apple every day.", sentenceEs: "Yo como una manzana todos los días." },
      { id: 2, english: "peach", spanish: "durazno", meaning: "A soft juicy fruit", sentenceEn: "She picks a peach from the tree.", sentenceEs: "Ella recoge un durazno del árbol." },
      { id: 3, english: "watermelon", spanish: "sandía", meaning: "A large juicy fruit", sentenceEn: "We share a watermelon in summer.", sentenceEs: "Compartimos una sandía en verano." },
      { id: 4, english: "grape", spanish: "uva", meaning: "A small sweet fruit", sentenceEn: "He eats grapes for a snack.", sentenceEs: "Él come uvas como merienda." },
      { id: 5, english: "plum", spanish: "ciruela", meaning: "A small purple fruit", sentenceEn: "The plum is ripe and sweet.", sentenceEs: "La ciruela está madura y dulce." },
      { id: 6, english: "pineapple", spanish: "piña", meaning: "A tropical spiky fruit", sentenceEn: "They cut a pineapple for dessert.", sentenceEs: "Cortan una piña para el postre." },
      ],
    },
    animals: {
      difficulty: 'basic',
      data: [
        { id: 1, english: "horse", spanish: "caballo", meaning: "A strong animal", sentenceEn: "The horse runs in the field.", sentenceEs: "El caballo corre en el campo." },
        { id: 2, english: "cat", spanish: "gato", meaning: "A quiet pet", sentenceEn: "The cat sleeps on the sofa.", sentenceEs: "El gato duerme en el sofá." },
        { id: 3, english: "bird", spanish: "pájaro", meaning: "A flying animal", sentenceEn: "A bird sings in the tree.", sentenceEs: "Un pájaro canta en el árbol." },
        { id: 4, english: "fish", spanish: "pez", meaning: "A water animal", sentenceEn: "The fish swims fast.", sentenceEs: "El pez nada rápido." }
      ],
    },
    colors: {
      difficulty: 'basic',
      data: [
        { id: 1, english: "purple", spanish: "púrpura", meaning: "A royal color", sentenceEn: "Her dress is purple.", sentenceEs: "Su vestido es púrpura." },
        { id: 2, english: "blue", spanish: "azul", meaning: "A cool color", sentenceEn: "The sky is blue.", sentenceEs: "El cielo es azul." },
        { id: 3, english: "yellow", spanish: "amarillo", meaning: "A bright color", sentenceEn: "The sun is yellow.", sentenceEs: "El sol es amarillo." },
        { id: 4, english: "green", spanish: "verde", meaning: "A nature color", sentenceEn: "The grass is green.", sentenceEs: "El césped es verde." }
      ],
    },
    "body-1": {
      difficulty: 'medium',
      data: [
        { id: 1, english: "head", spanish: "cabeza", meaning: "The top part of the body.", sentenceEn: "She touched her head.", sentenceEs: "Ella tocó su cabeza con la mano." },
        { id: 2, english: "arm", spanish: "brazo", meaning: "The part from the shoulder to the hand.", sentenceEn: "He raised his arm.", sentenceEs: "Él levantó el brazo para saludar." },
        { id: 3, english: "leg", spanish: "pierna", meaning: "The part from the hip to the foot.", sentenceEn: "My leg hurts after running.", sentenceEs: "Mi pierna duele después de correr." },
        { id: 4, english: "hand", spanish: "mano", meaning: "The part at the end of the arm.", sentenceEn: "I write with my right hand.", sentenceEs: "Escribo con mi mano derecha." },
        { id: 5, english: "foot", spanish: "pie", meaning: "The part at the end of the leg.", sentenceEn: "He washed his foot after walking.", sentenceEs: "Él lavó su pie después de caminar." }
      ],
    },
    // Nuevo nivel: Intermedio (Tiempo y Clima)
    "weather-1": {
      difficulty: 'medium',
      data: [
      { id: 1, english: "rain", spanish: "lluvia", meaning: "Water falling from the sky.", sentenceEn: "The rain stopped in the afternoon.", sentenceEs: "La lluvia paró en la tarde." },
      { id: 2, english: "sun", spanish: "sol", meaning: "The star that gives light and heat.", sentenceEn: "The sun shines brightly today.", sentenceEs: "El sol brilla intensamente hoy." },
      { id: 3, english: "wind", spanish: "viento", meaning: "Moving air.", sentenceEn: "The wind blew the leaves away.", sentenceEs: "El viento sopló las hojas lejos." },
      { id: 4, english: "cloud", spanish: "nube", meaning: "A mass of water vapor in the sky.", sentenceEn: "The sky is full of clouds.", sentenceEs: "El cielo está lleno de nubes." },
      { id: 5, english: "storm", spanish: "tormenta", meaning: "A strong weather event with rain and wind.", sentenceEn: "We stayed inside during the storm.", sentenceEs: "Nos quedamos adentro durante la tormenta." }
      ],
    },
    'travel-1': {
    difficulty: 'advanced',
    data: [
      { id: 1, english: 'passport', spanish: 'pasaporte', sentenceEn: 'I forgot my passport at home.', sentenceEs: 'Olvidé mi pasaporte en casa.' },
      { id: 2, english: 'luggage', spanish: 'equipaje', sentenceEn: 'My luggage is too heavy to carry.', sentenceEs: 'Mi equipaje es demasiado pesado para llevar.' },
      { id: 3, english: 'itinerary', spanish: 'itinerario', sentenceEn: 'The itinerary includes three cities.', sentenceEs: 'El itinerario incluye tres ciudades.' },
      { id: 4, english: 'boarding', spanish: 'embarque', sentenceEn: 'Boarding starts in ten minutes.', sentenceEs: 'El embarque comienza en diez minutos.' },
      { id: 5, english: 'reservation', spanish: 'reserva', sentenceEn: 'I made a reservation for tomorrow.', sentenceEs: 'Hice una reserva para mañana.' },
    ],
  },
  business: {
    difficulty: 'advanced',
    data: [
      { id: 1, english: 'meeting', spanish: 'reunión', sentenceEn: 'The meeting starts at noon.', sentenceEs: 'La reunión comienza al mediodía.' },
      { id: 2, english: 'contract', spanish: 'contrato', sentenceEn: 'We signed a contract yesterday.', sentenceEs: 'Firmamos un contrato ayer.' },
      { id: 3, english: 'proposal', spanish: 'propuesta', sentenceEn: 'She presented a great proposal.', sentenceEs: 'Ella presentó una gran propuesta.' },
      { id: 4, english: 'deadline', spanish: 'fecha límite', sentenceEn: 'The deadline is next week.', sentenceEs: 'La fecha límite es la próxima semana.' },
      { id: 5, english: 'revenue', spanish: 'ingresos', sentenceEn: 'Our revenue increased this year.', sentenceEs: 'Nuestros ingresos aumentaron este año.' },
    ],
  },
  technology: {
    difficulty: 'advanced',
    data: [
      { id: 1, english: 'processor', spanish: 'procesador', sentenceEn: 'The processor runs very fast.', sentenceEs: 'El procesador corre muy rápido.' },
      { id: 2, english: 'algorithm', spanish: 'algoritmo', sentenceEn: 'This algorithm is efficient.', sentenceEs: 'Este algoritmo es eficiente.' },
      { id: 3, english: 'database', spanish: 'base de datos', sentenceEn: 'The database crashed again.', sentenceEs: 'La base de datos se cayó otra vez.' },
      { id: 4, english: 'network', spanish: 'red', sentenceEn: 'The network is down today.', sentenceEs: 'La red está caída hoy.' },
      { id: 5, english: 'interface', spanish: 'interfaz', sentenceEn: 'The interface is user-friendly.', sentenceEs: 'La interfaz es fácil de usar.' },
    ],
  },
  };
  
  export default levels;
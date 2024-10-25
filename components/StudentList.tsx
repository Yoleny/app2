import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

interface Student {
  id: string;
  name: string;
}

const initialStudents: Student[] = [
  { id: '1', name: 'Marcos' },
  { id: '2', name: 'María' },
  { id: '3', name: 'Carlos' },
  { id: '4', name: 'Ana' },
  { id: '5', name: 'Luis' },
  { id: '6', name: 'Sofía' },
  { id: '7', name: 'Miguel' },
  { id: '8', name: 'Isabel' },
  { id: '9', name: 'Daniel' },
  { id: '10', name: 'Cesar' },
];

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [nextId, setNextId] = useState(11); 
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        const newStudent: Student = {
          id: nextId.toString(),
          name: `Estudiante ${nextId}`,
        };
        setStudents((prevStudents) => [...prevStudents, newStudent]);
        setNextId((prevId) => prevId + 1);
      }, 5000); 
    }

    return () => clearInterval(intervalId); 
  }, [isRunning, nextId]);

  const toggleAddingStudents = () => {
    setIsRunning((prev) => !prev); 
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentId}>{item.id}</Text>
      <Text style={styles.studentName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button title={isRunning ? "Detener" : "Reanudar"} onPress={toggleAddingStudents} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  studentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  studentId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentName: {
    fontSize: 16,
    color: '#666',
  },
});

export default StudentList;
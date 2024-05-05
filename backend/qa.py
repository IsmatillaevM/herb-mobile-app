import pickle
import numpy as np
from sklearn.neighbors import NearestNeighbors
from search import search_herb
from fuzzywuzzy import process
import sqlite3
class QA_Class:
    def __init__(self):
        
        self.model_path = 'plant_recommendation_model.pkl'
        self.vectorizer_path = 'symptom_vectorizer.pkl'
        with open(self.model_path, 'rb') as file:
            self.model = pickle.load(file)
        with open(self.vectorizer_path, 'rb') as file:
            self.vectorizer = pickle.load(file)

    def check_symptoms(symptoms):
        conn = sqlite3.connect('data.db')
        c= conn.cursor()
        data = c.execute('SELECT * FROM symptoms')
        symptom_list_data= [row[1] for row in data]
        checked_symptoms = []

        for item in symptoms:
            match = process.extractOne(item, symptom_list_data, score_cutoff=70)
            if match:
                checked_symptoms.append( match[0]) 
        
        return checked_symptoms
   
        
    
    def answering(self, symptoms: list):
        symptoms = QA_Class.check_symptoms(symptoms)
        symptoms = ' '.join(symptoms)
        symptoms = self.vectorizer.transform([symptoms])
      
        result = self.model.kneighbors(symptoms.todense(), n_neighbors=5)
        result = result[1][0]
        result = [search_herb(i) for i in result]
        
        return result
            
            


qa_class = QA_Class()

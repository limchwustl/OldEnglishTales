#Used External Resources SpaCy Library which I used to do a NLP on the raw text data
#I ws able to match words in the text with their part of speech
import spacy
import json
import collections
stories = []
#story object which takes eight parts of speech and title
class Story:
    def __init__(self, title, adjective,noun, adverb, verb, preposition, conjunction, pronoun, interjection):
        self.title = title
        self.adjective = adjective
        self.noun = noun
        self.adverb = adverb
        self.verb = verb
        self.preposition = preposition
        self.conjunction = conjunction
        self.pronoun = pronoun
        self.interjection = interjection
   


story_bank = collections.defaultdict(Story)
nlp = spacy.load("en_core_web_sm")
with open("englishfairytales.txt", "r" ) as f:
    f = f.read()
    #split stories by spacing
    stories = f.split("\n\n\n\n\n\n\n\n")
json_story = {}
for story in stories:
    doc = nlp(story)
    #split by word
    s = story.split("\n")
    title = s[0]
    if s[0] == "":
        title = s[1]
    
    cur_story = Story(title, collections.defaultdict(int),collections.defaultdict(int),collections.defaultdict(int),collections.defaultdict(int),collections.defaultdict(int),collections.defaultdict(int),collections.defaultdict(int),collections.defaultdict(int))
    
    #put word into a dictionary where it belongs by its part of speech token tag
    for token in doc:
       
        if token.pos_ == "ADJ":
            cur_story.adjective[token.lemma_] += 1
        if token.pos_ == "VERB":
            cur_story.verb[token.lemma_] += 1
        if token.pos_ == "ADP":
            cur_story.preposition[token.lemma_] += 1
        if token.pos_ == "NOUN" or token.pos_ == "PROPN":
            cur_story.noun[token.lemma_] += 1
        if token.pos_ == "PRON":
            cur_story.pronoun[token.lemma_] += 1
        if token.pos_ == "ADV":
            cur_story.adverb[token.lemma_] += 1
        if token.pos_ == "CCONJ":
            cur_story.conjunction[token.lemma_] += 1
        if token.pos_ == "INTJ":
            cur_story.interjection[token.lemma_] += 1
    jsonized = {"adjective" : cur_story.adjective, "adverb" : cur_story.adverb, "verb" : cur_story.verb, "preposition": cur_story.preposition, "noun": cur_story.noun, "pronoun": cur_story.pronoun, "conjunction": cur_story.conjunction, "interjection": cur_story.interjection}
  
    json_story[cur_story.title] = jsonized

    
    
#print(story_bank)

js = json.dumps(json_story)
#write to .json
with open("parsed.json", "w") as out_f:
    out_f.write(js)
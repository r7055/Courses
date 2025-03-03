// lesson6.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include "Soldier.h"
#include <vector>
#include <algorithm>
#include <iterator>
#include "Commander.h"
#include "Officer.h"
#include "Private.h"
using namespace std;
enum option {
	stop,	//	סיום התוכנית
	addNewSoldier,	//	הוספת חייל חדש
	medalList,	//	הדפסת פרטי כל החיילים הזכאים לצל"ש
	mostSociometric,	//	הדפסת שם (משפחה ופרטי) של  החייל בעל ציון סוציומטרי מקסימלי 
	countMedalPrivate,	//	הדפסת מספר החיילים הטירוניים הזכאים לצל"ש
	noCombatCommander,	//	הדפסת שמות (משפחה ופרטי) של המפקדים שאינם בקרבי
	overSoldier,	//	הדפסת הודעה מתאימה, האם קיים חייל שהשתתף ביותר מ- 15  מבצעים צבאיים
	removeOfficer,	//	מחיקת כל החיילים הקצינים שלא השתתפו כלל במבצע צבאי
};

void add(vector<Soldier*>&);    //השלם\י פרמטר- ווקטור או רשימה  
void medal(vector<Soldier*>&);   //השלם\י פרמטר- ווקטור או רשימה  
Soldier* mostSociometricScore(vector<Soldier*>&);   //השלם\י פרמטר- ווקטור או רשימה  


int main() {
	vector<Soldier*> soldiers;
	int op;
	Soldier* s;
	cout << "enter 0-7\n";
	cin >> op;
	while (op != stop) {
		switch (op) {
		case addNewSoldier:
			add(soldiers);
			break;
		case medalList:
			 medal(soldiers);
			break;
		case mostSociometric:
			s = mostSociometricScore(soldiers);
			cout << "Officer soldier with most sociometric score: ";
			cout << s->getFName() << ' ' << s->getLName() << endl;
			break;
		case countMedalPrivate:
			cout << "# private soldier for medal: ";
			cout << count_if(soldiers.begin(), soldiers.end(), [](Soldier* soldier) {
				return soldier->SoldierType() == "Private" && soldier->medal();
				});
			cout << endl;
			break;
		case noCombatCommander: {
			vector<Soldier*> noCombatCommanders;
			copy_if(soldiers.begin(), soldiers.end(), back_inserter(noCombatCommanders), [](Soldier* soldier) {
				return soldier->SoldierType() == "Commander" && !((Commander*)soldier)->getIsCombat();
				});
			for_each(noCombatCommanders.begin(), noCombatCommanders.end(), [](Soldier* soldier) {
				soldier->print();
				});
			cout << endl;
			break;
		}
		case overSoldier:
			if (any_of(soldiers.begin(), soldiers.end(), [](Soldier* soldi) {
				return soldi->SoldierType() == "Private" && soldi->getOperation() > 15;
				}))
				cout << "there is a soldier that takes more than 15 operations\n";
			else
				cout << "no soldier takes more than 15 operations\n";
			break;
		case removeOfficer:
			soldiers.erase(remove_if(soldiers.begin(), soldiers.end(), [](Soldier* soldier) {
				return soldier->SoldierType() == "Officer" && soldier->getOperation() == 0;
				}), soldiers.end());
			for_each(soldiers.begin(), soldiers.end(), [](Soldier* soldier) {
				soldier->print();
				});
			break;
		}
		cout << "enter 0-7\n";
		cin >> op;
	}
	return 0;
}


void add(vector<Soldier*>& soldiers)
{
	cout << "enter 1 to add a private solider" << endl;
	cout << "enter 2 to add a commander solider " << endl;
	cout << "enter 3 to add a officer solider " << endl;
	int choice;
	cin >> choice;
	int id;
	string firstName;
	string lastName;
	int operation;
	cout << "Enter id,first name,last name and number of operation ";
	cin >> id;
	cin >> firstName;
	cin >> lastName;
	cin >> operation;
	cout << "Enter " << operation << " marks ";
	vector<int> marks;
	for (int i = 0; i < operation; i++)
	{
		int mark;
		cin >> mark;
		marks.push_back(mark);
	}
	if (choice == 2) {
		cout << "Enter  1 if the solider is combat sociometric ";
		bool isCombat;
		cin >> isCombat;
		soldiers.push_back(new Commander(id, firstName, lastName, operation, marks, isCombat));
	}
	else if (choice == 3) {
		cout << "Enter number of sociometric score";
		int sociometric;
		cin >> sociometric;
		soldiers.push_back(new Officer(id, firstName, lastName, operation, sociometric));
	}
	else {
		soldiers.push_back(new Private(id, firstName, lastName, operation, marks));
	}
}
void medal(vector<Soldier*>&  solider)
{
	for (vector<Soldier*>::iterator it = solider.begin(); it != solider.end(); it++) {
		if ((*it)->medal())
			(*it)->print();
	}
}
Soldier* mostSociometricScore(vector<Soldier*>& soliters)
 {
		auto it = max_element(soliters.begin(), soliters.end(), [](Soldier*& s1, Soldier*& s2) {
			if (s1->SoldierType() == "Officer" && s2->SoldierType() == "Officer")
				return ((Officer*)s1)->getSociometricScore() < ((Officer*)s2)->getSociometricScore();
			else if (s1->SoldierType() == "Officer")
				return false;
			else
				return true;
			});

		if (it != soliters.end() && (*it)->SoldierType() == "Officer")
			return (*it);
		else
			return nullptr;
 }

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file

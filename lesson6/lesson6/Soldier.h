#pragma once
#include <iostream>
using namespace std;

class Soldier
{
protected:
	int id;
	string firstName;
	string lastName;
	int operation;

public:
	Soldier(int id, string firstName, string LastName, int operation) :id(id), firstName(firstName), lastName(LastName), operation(operation)
	{

	}
	Soldier()
	{

	}
	virtual ~Soldier()
	{
	}
	virtual bool medal() = 0;
	virtual void print()=0 {
		cout << "ID: " << id << " First Name: " << firstName << " Last Name: " << lastName << " Num Operation: " << operation << endl;
	}
	string getFName() {
		return firstName;
	}
	string getLName() {
		return lastName;
	}
	int getOperation() {
		return operation;
	}
	
	virtual string SoldierType() = 0;
	virtual int getSociometricScore() {
		throw "ERROR: this function is just for officer soldier";
	}
};



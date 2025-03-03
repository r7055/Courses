#pragma once
#include "Soldier.h"
#include <vector>
#include <iterator>
#include <algorithm>

class Private : public Soldier
{
protected:
    vector<int> marks;

public:
    Private(int id, string firstName, string lastName, int operation, vector<int> marks) : Soldier(id, firstName, lastName, operation)
    {
		for_each(marks.begin(), marks.end(), [this](int mark) {
			this->marks.push_back(mark);
			});
    }

    Private(const Private& other) : Soldier(other.id, other.firstName, other.lastName, other.operation)
    {
        for_each(other.marks.begin(), other.marks.end(), [this](int mark) {
			this->marks.push_back(mark);
				});
    }

    Private(Private&& other) : Soldier(other.id, other.firstName, other.lastName, other.operation)
    {
        marks = other.marks;
    }

    Private()
    {
        
    }

    ~Private()
    {
		/*if (marks != nullptr)
         delete marks;*/
    }

    bool medal() override;
    void print() override;
	string SoldierType() override
	{
		return "Private";
	}
};


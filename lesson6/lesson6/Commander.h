#pragma once
#include "Private.h"

class Commander : public Private
{
    bool isCombat;

public:
    Commander(int id, string firstName, string lastName,int operation, vector<int> marks, bool isCombat)
        : Private(id, firstName, lastName,operation, marks), isCombat(isCombat)
    {
    }

    Commander():isCombat(false)
    {
    }

    ~Commander()
    {
    }
	bool getIsCombat() 
	{
		return isCombat;
	}

    void print() override;
  
    bool medal() override;
	string SoldierType() override
	{
		return "Commander";
	}
	
};


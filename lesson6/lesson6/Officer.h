#pragma once
#include "Soldier.h"
class Officer :
    public Soldier
{
    int sociometric;
public:
    Officer(int id, string firstName, string lastName, int operation, int sociometric) : Soldier(id, firstName, lastName, operation), sociometric(sociometric)
    {
    }
    
    ~Officer()
    {
    }
    void print() override;
    
    bool medal() override;
    string SoldierType() override
    {
        return "Officer";
    }
    int getSociometricScore() 
    {
        return sociometric;
    }
};

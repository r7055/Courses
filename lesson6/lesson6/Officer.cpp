#include "Officer.h"
void Officer::print()
{
	Soldier::print();
	cout << "Sociometric: " << sociometric << endl;
}
bool Officer::medal()
{
	return sociometric >= 92 && operation>2;
}

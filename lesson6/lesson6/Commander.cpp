#include "Commander.h"
bool Commander::medal()
{
	if (operation < 7)
		return false;
	double sum = 0;
	for (int i = 0; i < operation; i++)
	{
		sum += marks[i];
	}
	return isCombat && (sum / operation > 90);
}
void Commander::print()
{
	Private::print();
	cout << "Is Combat: " << (isCombat ? "Yes" : "No") << endl;
}
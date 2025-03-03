#include "Private.h"
void Private::print()
{
	Soldier::print();
	cout << "Marks: ";
	for_each(marks.begin(), marks.end(), [](int mark) {
		cout << mark << " ";
		});
	cout << endl;
}
bool Private::medal()
{
	if (operation < 10)
		return false;
	double sum = 0;
	for (int i = 0; i < operation; i++)
	{
		sum += marks[i];
	}
	return (sum / operation > 95);
}

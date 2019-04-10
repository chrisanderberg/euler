#include <stdio.h>

int main()
{
    int sum = 0;

    /* each number up to but excluding 1000 */
    for (int i = 0; i < 1000; i++)
    {
        /* add numbers divisible by 3 or 5 to the sum */
        if (i % 3 == 0 || i % 5 == 0)
        {
            sum += i;
        }
    }

    /* print the result */
    printf("%d\n", sum);

    /* process terminates successfully */
    return 0;
}

# Generated by Django 5.1.7 on 2025-03-26 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('borrower', models.CharField(max_length=255)),
                ('address', models.TextField()),
                ('coName', models.CharField(max_length=255)),
                ('coAddress', models.TextField()),
                ('dpd', models.IntegerField()),
                ('amount', models.FloatField()),
                ('region', models.CharField(max_length=50)),
                ('status', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

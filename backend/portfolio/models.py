from django.db import models

def generate_custom_loan_id():
    last_loan = Loan.objects.order_by("-created_at").first()
    if not last_loan or not last_loan.id.startswith("L28U"):
        return "L28U0001"
    
    last_id_num = int(last_loan.id.replace("L28U", ""))
    new_id_num = last_id_num + 1
    return f"L28U{new_id_num:04d}"

class Loan(models.Model):
    id = models.CharField(primary_key=True, max_length=20, editable=False)
    type = models.CharField(max_length=50)
    borrower = models.CharField(max_length=255)
    address = models.TextField()
    coName = models.CharField(max_length=255)
    coAddress = models.TextField()
    dpd = models.IntegerField()
    amount = models.FloatField()
    region = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = generate_custom_loan_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Loan {self.id} - {self.borrower}"

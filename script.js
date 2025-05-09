document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const heightCm = parseFloat(document.getElementById('height-cm').value);
    const weightKg = parseFloat(document.getElementById('weight').value);

    if (isNaN(age) || age <= 0 || isNaN(heightCm) || heightCm <= 0 || isNaN(weightKg) || weightKg <= 0) {
        showToast('Please enter valid positive numbers.');
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);

    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    const minHealthyWeight = 18.5 * (heightM * heightM);
    const maxHealthyWeight = 24.9 * (heightM * heightM);

    let advice = '';
    if (weightKg < minHealthyWeight) {
        const needed = (minHealthyWeight - weightKg).toFixed(1);
        advice = `You need to <strong>gain approximately ${needed} kg</strong> to reach the healthy range.`;
    } else if (weightKg > maxHealthyWeight) {
        const needed = (weightKg - maxHealthyWeight).toFixed(1);
        advice = `You need to <strong>lose approximately ${needed} kg</strong> to reach the healthy range.`;
    } else {
        advice = `You are within the healthy weight range. Keep it up!`;
    }

    const message = `Your BMI is <strong>${bmiRounded}</strong> (${category}).<br>${advice}`;
    showToast(message);
});

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastContent = document.getElementById('toast-content');

    toastContent.innerHTML = message;
    toast.classList.add('show');
}

function closeToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');

    document.getElementById('bmiForm').reset();
}

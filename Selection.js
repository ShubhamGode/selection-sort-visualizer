    let array = [];

    function createArray() {
      const input = document.getElementById('arrayInput').value;
      array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

      if (array.length === 0) {
        alert("Please enter a valid array like: 4,5,1,2,3");
        return;
      }

      displayArray();
      updateExplanation("Array ready! Click 'Start Sorting' to begin.");
    }

    function displayArray(highlight = {}) {
      const container = document.getElementById('arrayDisplay');
      container.innerHTML = '';

      array.forEach((num, idx) => {
        const div = document.createElement('div');
        div.classList.add('number-box');

        if (highlight.sorted && highlight.sorted.includes(idx)) {
          div.classList.add('sorted');
        } else if (idx === highlight.minIndex) {
          div.classList.add('min');
        } else if (highlight.comparing && highlight.comparing.includes(idx)) {
          div.classList.add('comparing');
        }

        div.textContent = num;
        container.appendChild(div);
      });
    }

    function updateExplanation(text) {
      document.getElementById("explanationText").textContent = text;
    }

    async function selectionSort() {
      let sortedIndices = [];

      for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        updateExplanation(`Starting index ${i}. Assume ${array[i]} is minimum.`);
        displayArray({ minIndex, sorted: sortedIndices });
        await sleep(700);

        for (let j = i + 1; j < array.length; j++) {
          displayArray({ minIndex, comparing: [j], sorted: sortedIndices });
          updateExplanation(`Comparing ${array[j]} with current min ${array[minIndex]}`);
          await sleep(700);

          if (array[j] < array[minIndex]) {
            minIndex = j;
            displayArray({ minIndex, comparing: [j], sorted: sortedIndices });
            updateExplanation(`New minimum found: ${array[minIndex]}`);
            await sleep(700);
          }
        }

        if (minIndex !== i) {
          updateExplanation(`Swapping ${array[i]} and ${array[minIndex]}`);
          [array[i], array[minIndex]] = [array[minIndex], array[i]];
          await sleep(700);
        }

        sortedIndices.push(i);
        displayArray({ sorted: sortedIndices });
        updateExplanation(`${array[i]} is placed at correct position.`);
        await sleep(700);
      }

      updateExplanation("✅ Sorting complete!");
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
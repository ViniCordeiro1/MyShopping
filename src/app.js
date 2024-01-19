        // Função para renderizar os campos de entrada do item
        function renderItemInput() {
            const itemInput = document.getElementById('item-input');
            itemInput.classList.toggle('hidden');

            if (!itemInput.classList.contains('hidden')) {
                document.getElementById('item-name').focus();
            }
        }

        // Função para adicionar o item à lista
        function addItemToList() {
            const itemName = document.getElementById('item-name').value;
            const itemPrice = parseFloat(document.getElementById('item-price').value);
        
            if (itemName && itemPrice) {
                addItem(itemName, itemPrice);
                renderItemInput();
            }
        }
        
        // Variáveis globais
        let items = [];
        let total = 0;
        
        // Adiciona um item à lista de compras
        function addItem(name, price) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <p>${name}</p>
                <p>R$ ${price.toFixed(2)}</p>
                <span class="remove-icon">&#10006;</span>
            `;
        
            const removeIcon = itemElement.querySelector(".remove-icon");
            removeIcon.addEventListener("click", function () {
                removeItemFromList(name, price);
            });
        
            const itemsContainer = document.querySelector('.ListItem');
            itemsContainer.appendChild(itemElement);
        
            items.push({ name, price });
            total += price;
            calculateBalance();
        }
        
        // Remove um item da lista de compras
        function removeItemFromList(name, price) {
            items = items.filter(item => item.name !== name || item.price !== price);
            total -= price;
        
            const itemList = document.querySelector('.ListItem');
            const listItems = itemList.getElementsByClassName('item');
        
            for (let i = 0; i < listItems.length; i++) {
                const listItem = listItems[i];
                const itemName = listItem.getElementsByTagName('p')[0].textContent;
                const itemPrice = parseFloat(listItem.getElementsByTagName('p')[1].textContent.replace('R$ ', ''));
        
                if (itemName === name && itemPrice === price) {
                    itemList.removeChild(listItem);
                    break;
                }
            }
        
            calculateBalance();
        }
        
        // Calcula o saldo atual e atualiza a interface
        function calculateBalance() {
            const saldo = document.getElementById('saldo');
            const saldoAtual = document.getElementById('saldoAtual');
        
            if (saldo.value === '') {
                saldoAtual.textContent = 'R$ 0,00';
            } else {
                const currentBalance = parseFloat(saldo.value) - total;
                saldoAtual.textContent = 'R$ ' + currentBalance.toFixed(2);
            }
        }
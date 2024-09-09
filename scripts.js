const send = document.querySelector("#send")

send.addEventListener("click", function(e) {
    e.preventDefault() 

    // Pega o valor do input
    const nameInput = document.querySelector("#nameInput")
    const nomProd = nameInput.value.trim() 

    console.log("Valor do input:", nomProd) 

    
    if (nomProd.length > 0) {
        // Verifica se o item já existe
        if (!isItemDuplicate(nomProd)) {
            // pega o container onde os produtos serão adicionados
            const productContainer = document.querySelector(".produtos")

            // modifica a propriedade display do elemento para block para que ele apareça
            if (getComputedStyle(productContainer).display === "none") {
                productContainer.style.display = "block"
            }

            // Cria uma nova div para o banner do produto
            const newBanner = document.createElement("div")
            newBanner.classList.add("product-banner") 

            const formattedName = nomProd.charAt(0).toUpperCase() + nomProd.slice(1).toLowerCase()
            
            // Define o conteúdo HTML do novo banner
            newBanner.innerHTML = `
                <input type="checkbox" class="product-checkbox">
                <span class="product-name">${formattedName}</span>
                <button class="delete-btn"></button>
            `

            // Adiciona o novo banner ao container de produtos
            productContainer.appendChild(newBanner)

            addDeleteButtonListener(newBanner)

            // Limpa o campo de entrada
            nameInput.value = ""

        } else {
            alert("Esse item já foi adicionado.")
        }
    } else {
        alert("Escreva o nome do produto que deseja adicionar.")
    }
})


function isItemDuplicate(itemName) {
    const productContainer = document.querySelector(".produtos")
    const existingItems = productContainer.querySelectorAll(".product-name")

    //para cada iteracao a variavel item recebe o valor do item existente (Como se recebesse o elemento nx que esta rodando)
    for (const item of existingItems) {
        if (item.textContent.trim().toLowerCase() === itemName.toLowerCase()) {
            return true // Item duplicado encontrado
        }
    }

    return false // Item não duplicado
}


function addDeleteButtonListener(banner) {

    //pegando o elemento de deletar
    const deleteButton = banner.querySelector(".delete-btn")

    //criando a funcao para apagar o elemento 
    deleteButton.addEventListener("click", function() {

        //selecionando todo e elemento do banner
        const productContainer = document.querySelector(".produtos")
        //removendo o banner 
        productContainer.removeChild(banner)

        // caso nao tenha mais nenhum banner esconde o elemento inteiro
        if (productContainer.children.length === 0) {
            productContainer.style.display = "none"
        }
    })
}

// Evento de clique na lixeira para remover todos os itens selecionados
document.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("delete-btn")) {
        // Seleciona o container onde os produtos estão
        const productContainer = document.getElementsByClassName("produtos")[0]
        const checkboxes = productContainer.getElementsByClassName("product-checkbox")

        // Itera sobre todas as caixas de seleção
        Array.from(checkboxes).forEach(checkbox => {
            if (checkbox.checked) {
                const banner = checkbox.parentElement // Obtém o banner do item
                productContainer.removeChild(banner)
            }
        })

        // Se não há mais banners, pode esconder o container
        if (productContainer.children.length === 0) {
            productContainer.style.display = "none"
        }
    }
}) 



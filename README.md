# Algoritmo de Busca (Inteligência Artifical)

![alt tag](http://www.alzaro.com.br/img/alisson.jpg)

## Entradas:

	- Considere o grafo em um mundo de grade com apenas 2 linhas e n colunas (1 <= n <= 10).
	- Usuário entra com a quantidade de vértices (conforme exemplo do grafo acima).
	- Usuário entra com as arestas.
	- Considera-se o peso de cada aresta como sendo: peso 1 nas arestas horizontais ou verticais e peso
	-  nas arestas em diagonal.
	- Usuário informa qual é o vértice inicial e o vértice final para encontrar o menor caminho.

## Processamento:

	- Armazenar os vértices e pesos das arestas em uma matriz de adjacências, minimizando o espaço.
	- Aplicar algoritmo de busca para encontrar o melhor caminho.
	- Calcular a distância Manhattan do ponto inicial ao ponto final, sendo:
		- Distância Manhattan entre ** P1(x1, y1) e P2(x2, y2) é dm = |x1 - x2| + |y1 - y2| **.

## Saídas:

	- Exibir a matriz de adjacências com o espaço minimizado.
	- Exibir o grafo completo.
	- Exibir o nome de cada vértice percorrido, na sequência certa, indicando o caminho.
	- Exibir a distância efetivamente percorrida por um agente, do vértice inicial ao vértice final.
	- Exibir a distância Manhattan do ponto inicial ao ponto final.
	- Exibir o nome do algoritmo (ou explique sua heurística) utilizado para encontrar o melhor caminho.

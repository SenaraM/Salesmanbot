from flask import Flask
from flask import request
from flask import redirect
import negotiate

app = Flask(__name__)

@app.route('/chat', methods=["POST"])
def chat():
    #return "2", 200
    print(request.json)
    if request.json["message"] != "weather":
        machine = request.json["message"][request.json["message"].find("[")+1:request.json["message"].find("]")]
        print(machine)
        while True:
            text2 = request.json["message"]
            if text2 == "Stop" or text2 == "stop":
                return ("Thank you!", 200)
            elif text2 == "ok" or text2 == "OK" or text2 == "Ok":
                return ("You can find products from B block", 200)
            text2 = negotiate.bestMatch(text2)
            if text2 != "null":
                break
            return ("No matching keywords... Enter again", 200)

        print("Best Match: "+text2)
        brands = ["Ambewela", "Anchor", "ElephantHouse", "Milo", "Pelawaththa", "Highland"]
        if (text2.capitalize() in brands):
            i = brands.index(text2.capitalize())
            list = negotiate.getAvailableProducts(brands[i])
            print(list)
            return (list, 200)
            #text = input()
            #if(text == "ok"):
            #    print("purchased")
            #else:
            #    print("negotiation terminated")
        elif (negotiate.productAvailability(text2) > 0):
            result = negotiate.getProductDetails(text2)
            print(result)
            print('Product Available\n')
            cat = result[0]["category"]+"[m]"
            result.append(cat)
            return (result, 200)

        else:
            print('Check 1 - Product Not Available\n')
            #if machine == "m":
                #result = getFromPurchaseHistory(text2)
                #result.append("text2")
                #return (result, 200)

            print('Check 2 - Customer Not Satisfied. Continue\n')
            result = negotiate.getSimilarProductsCluster(text2)
            result.append("weather")
            return (result, 200)
    else:
        print('Check 3 - Customer Not Satisfied. Continue\n')
        result = negotiate.getProductsWeather()
        return (result, 200)


if __name__ == "__main__":
    app.run(debug=True)
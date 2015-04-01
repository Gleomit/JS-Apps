$(window).ready(function() {
    $.fn.grid = function () {
        var temp;

        this.addHeader = function(arrayOfCellInfo){
            var i = 0;
            temp = arrayOfCellInfo.length;

            for(i = 0; i < arrayOfCellInfo.length; i += 1){
                $(this).append('<th>' + arrayOfCellInfo[i].toString() + '</th>');
            }
        };

        this.addRow = function(arrayOfCellInfo){
            var toAppend = "<tr>";

            for(i = 0; i < arrayOfCellInfo.length; i += 1){
                toAppend += '<td>' + arrayOfCellInfo[i].toString() + '</td>';
            }

            toAppend += "</tr>";

            $(this).append(toAppend);
        };

        this.cellsHorizontalLenght = temp;

        return this;
    };

    var grid = $('#myGrid').grid();

    grid.addHeader(['First Name', 'Last Name', 'Age']);

    grid.addRow(['Bay', 'Ivan', 50]);
    grid.addRow(['Kaka', 'Penka', 26]);

    grid.addRow(['Bocho', 'Mocho', 26]);
});


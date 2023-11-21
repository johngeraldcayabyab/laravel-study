<x-app-layout>
    <div class="container mx-auto py-6 px-4">
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
            <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                <thead>
                <tr class="text-left">
                    <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                        Key
                    </th>
                    <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                        Value
                    </th>
                </tr>
                </thead>
                <tbody>
                @foreach($options as $option)
                    <tr>
                        <td class="border-solid border-t border-gray-200">
                        <span class="text-gray-700 px-6 py-3 flex items-center">
                            {{$option['key']}}
                        </span>
                        </td>
                        <td class="border-solid border-t border-gray-200">
                        <span class="text-gray-700 px-6 py-3 flex items-center">
                            {{$option['value']}}
                        </span>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>


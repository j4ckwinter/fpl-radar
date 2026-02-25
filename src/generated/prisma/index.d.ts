
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FplBootstrapSnapshot
 * 
 */
export type FplBootstrapSnapshot = $Result.DefaultSelection<Prisma.$FplBootstrapSnapshotPayload>
/**
 * Model FplTeam
 * 
 */
export type FplTeam = $Result.DefaultSelection<Prisma.$FplTeamPayload>
/**
 * Model FplPosition
 * 
 */
export type FplPosition = $Result.DefaultSelection<Prisma.$FplPositionPayload>
/**
 * Model FplPlayer
 * 
 */
export type FplPlayer = $Result.DefaultSelection<Prisma.$FplPlayerPayload>
/**
 * Model FplGameweek
 * 
 */
export type FplGameweek = $Result.DefaultSelection<Prisma.$FplGameweekPayload>
/**
 * Model FplLeague
 * 
 */
export type FplLeague = $Result.DefaultSelection<Prisma.$FplLeaguePayload>
/**
 * Model FplLeagueEntry
 * 
 */
export type FplLeagueEntry = $Result.DefaultSelection<Prisma.$FplLeagueEntryPayload>
/**
 * Model FplEntrySnapshot
 * 
 */
export type FplEntrySnapshot = $Result.DefaultSelection<Prisma.$FplEntrySnapshotPayload>
/**
 * Model FplEntryPick
 * 
 */
export type FplEntryPick = $Result.DefaultSelection<Prisma.$FplEntryPickPayload>
/**
 * Model FplEntryTransfer
 * 
 */
export type FplEntryTransfer = $Result.DefaultSelection<Prisma.$FplEntryTransferPayload>
/**
 * Model FplEntryBehaviourProfile
 * 
 */
export type FplEntryBehaviourProfile = $Result.DefaultSelection<Prisma.$FplEntryBehaviourProfilePayload>
/**
 * Model FplFixture
 * 
 */
export type FplFixture = $Result.DefaultSelection<Prisma.$FplFixturePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FplBootstrapSnapshots
 * const fplBootstrapSnapshots = await prisma.fplBootstrapSnapshot.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FplBootstrapSnapshots
   * const fplBootstrapSnapshots = await prisma.fplBootstrapSnapshot.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.fplBootstrapSnapshot`: Exposes CRUD operations for the **FplBootstrapSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplBootstrapSnapshots
    * const fplBootstrapSnapshots = await prisma.fplBootstrapSnapshot.findMany()
    * ```
    */
  get fplBootstrapSnapshot(): Prisma.FplBootstrapSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplTeam`: Exposes CRUD operations for the **FplTeam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplTeams
    * const fplTeams = await prisma.fplTeam.findMany()
    * ```
    */
  get fplTeam(): Prisma.FplTeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplPosition`: Exposes CRUD operations for the **FplPosition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplPositions
    * const fplPositions = await prisma.fplPosition.findMany()
    * ```
    */
  get fplPosition(): Prisma.FplPositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplPlayer`: Exposes CRUD operations for the **FplPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplPlayers
    * const fplPlayers = await prisma.fplPlayer.findMany()
    * ```
    */
  get fplPlayer(): Prisma.FplPlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplGameweek`: Exposes CRUD operations for the **FplGameweek** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplGameweeks
    * const fplGameweeks = await prisma.fplGameweek.findMany()
    * ```
    */
  get fplGameweek(): Prisma.FplGameweekDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplLeague`: Exposes CRUD operations for the **FplLeague** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplLeagues
    * const fplLeagues = await prisma.fplLeague.findMany()
    * ```
    */
  get fplLeague(): Prisma.FplLeagueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplLeagueEntry`: Exposes CRUD operations for the **FplLeagueEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplLeagueEntries
    * const fplLeagueEntries = await prisma.fplLeagueEntry.findMany()
    * ```
    */
  get fplLeagueEntry(): Prisma.FplLeagueEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplEntrySnapshot`: Exposes CRUD operations for the **FplEntrySnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplEntrySnapshots
    * const fplEntrySnapshots = await prisma.fplEntrySnapshot.findMany()
    * ```
    */
  get fplEntrySnapshot(): Prisma.FplEntrySnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplEntryPick`: Exposes CRUD operations for the **FplEntryPick** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplEntryPicks
    * const fplEntryPicks = await prisma.fplEntryPick.findMany()
    * ```
    */
  get fplEntryPick(): Prisma.FplEntryPickDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplEntryTransfer`: Exposes CRUD operations for the **FplEntryTransfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplEntryTransfers
    * const fplEntryTransfers = await prisma.fplEntryTransfer.findMany()
    * ```
    */
  get fplEntryTransfer(): Prisma.FplEntryTransferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplEntryBehaviourProfile`: Exposes CRUD operations for the **FplEntryBehaviourProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplEntryBehaviourProfiles
    * const fplEntryBehaviourProfiles = await prisma.fplEntryBehaviourProfile.findMany()
    * ```
    */
  get fplEntryBehaviourProfile(): Prisma.FplEntryBehaviourProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fplFixture`: Exposes CRUD operations for the **FplFixture** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FplFixtures
    * const fplFixtures = await prisma.fplFixture.findMany()
    * ```
    */
  get fplFixture(): Prisma.FplFixtureDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FplBootstrapSnapshot: 'FplBootstrapSnapshot',
    FplTeam: 'FplTeam',
    FplPosition: 'FplPosition',
    FplPlayer: 'FplPlayer',
    FplGameweek: 'FplGameweek',
    FplLeague: 'FplLeague',
    FplLeagueEntry: 'FplLeagueEntry',
    FplEntrySnapshot: 'FplEntrySnapshot',
    FplEntryPick: 'FplEntryPick',
    FplEntryTransfer: 'FplEntryTransfer',
    FplEntryBehaviourProfile: 'FplEntryBehaviourProfile',
    FplFixture: 'FplFixture'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "fplBootstrapSnapshot" | "fplTeam" | "fplPosition" | "fplPlayer" | "fplGameweek" | "fplLeague" | "fplLeagueEntry" | "fplEntrySnapshot" | "fplEntryPick" | "fplEntryTransfer" | "fplEntryBehaviourProfile" | "fplFixture"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FplBootstrapSnapshot: {
        payload: Prisma.$FplBootstrapSnapshotPayload<ExtArgs>
        fields: Prisma.FplBootstrapSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplBootstrapSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplBootstrapSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>
          }
          findFirst: {
            args: Prisma.FplBootstrapSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplBootstrapSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>
          }
          findMany: {
            args: Prisma.FplBootstrapSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>[]
          }
          create: {
            args: Prisma.FplBootstrapSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>
          }
          createMany: {
            args: Prisma.FplBootstrapSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplBootstrapSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>[]
          }
          delete: {
            args: Prisma.FplBootstrapSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>
          }
          update: {
            args: Prisma.FplBootstrapSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.FplBootstrapSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplBootstrapSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplBootstrapSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.FplBootstrapSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplBootstrapSnapshotPayload>
          }
          aggregate: {
            args: Prisma.FplBootstrapSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplBootstrapSnapshot>
          }
          groupBy: {
            args: Prisma.FplBootstrapSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplBootstrapSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplBootstrapSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<FplBootstrapSnapshotCountAggregateOutputType> | number
          }
        }
      }
      FplTeam: {
        payload: Prisma.$FplTeamPayload<ExtArgs>
        fields: Prisma.FplTeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplTeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplTeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>
          }
          findFirst: {
            args: Prisma.FplTeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplTeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>
          }
          findMany: {
            args: Prisma.FplTeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>[]
          }
          create: {
            args: Prisma.FplTeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>
          }
          createMany: {
            args: Prisma.FplTeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplTeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>[]
          }
          delete: {
            args: Prisma.FplTeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>
          }
          update: {
            args: Prisma.FplTeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>
          }
          deleteMany: {
            args: Prisma.FplTeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplTeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplTeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>[]
          }
          upsert: {
            args: Prisma.FplTeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplTeamPayload>
          }
          aggregate: {
            args: Prisma.FplTeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplTeam>
          }
          groupBy: {
            args: Prisma.FplTeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplTeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplTeamCountArgs<ExtArgs>
            result: $Utils.Optional<FplTeamCountAggregateOutputType> | number
          }
        }
      }
      FplPosition: {
        payload: Prisma.$FplPositionPayload<ExtArgs>
        fields: Prisma.FplPositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplPositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplPositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>
          }
          findFirst: {
            args: Prisma.FplPositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplPositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>
          }
          findMany: {
            args: Prisma.FplPositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>[]
          }
          create: {
            args: Prisma.FplPositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>
          }
          createMany: {
            args: Prisma.FplPositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplPositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>[]
          }
          delete: {
            args: Prisma.FplPositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>
          }
          update: {
            args: Prisma.FplPositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>
          }
          deleteMany: {
            args: Prisma.FplPositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplPositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplPositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>[]
          }
          upsert: {
            args: Prisma.FplPositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPositionPayload>
          }
          aggregate: {
            args: Prisma.FplPositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplPosition>
          }
          groupBy: {
            args: Prisma.FplPositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplPositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplPositionCountArgs<ExtArgs>
            result: $Utils.Optional<FplPositionCountAggregateOutputType> | number
          }
        }
      }
      FplPlayer: {
        payload: Prisma.$FplPlayerPayload<ExtArgs>
        fields: Prisma.FplPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>
          }
          findFirst: {
            args: Prisma.FplPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>
          }
          findMany: {
            args: Prisma.FplPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>[]
          }
          create: {
            args: Prisma.FplPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>
          }
          createMany: {
            args: Prisma.FplPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>[]
          }
          delete: {
            args: Prisma.FplPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>
          }
          update: {
            args: Prisma.FplPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>
          }
          deleteMany: {
            args: Prisma.FplPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplPlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>[]
          }
          upsert: {
            args: Prisma.FplPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplPlayerPayload>
          }
          aggregate: {
            args: Prisma.FplPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplPlayer>
          }
          groupBy: {
            args: Prisma.FplPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<FplPlayerCountAggregateOutputType> | number
          }
        }
      }
      FplGameweek: {
        payload: Prisma.$FplGameweekPayload<ExtArgs>
        fields: Prisma.FplGameweekFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplGameweekFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplGameweekFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>
          }
          findFirst: {
            args: Prisma.FplGameweekFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplGameweekFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>
          }
          findMany: {
            args: Prisma.FplGameweekFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>[]
          }
          create: {
            args: Prisma.FplGameweekCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>
          }
          createMany: {
            args: Prisma.FplGameweekCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplGameweekCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>[]
          }
          delete: {
            args: Prisma.FplGameweekDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>
          }
          update: {
            args: Prisma.FplGameweekUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>
          }
          deleteMany: {
            args: Prisma.FplGameweekDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplGameweekUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplGameweekUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>[]
          }
          upsert: {
            args: Prisma.FplGameweekUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplGameweekPayload>
          }
          aggregate: {
            args: Prisma.FplGameweekAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplGameweek>
          }
          groupBy: {
            args: Prisma.FplGameweekGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplGameweekGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplGameweekCountArgs<ExtArgs>
            result: $Utils.Optional<FplGameweekCountAggregateOutputType> | number
          }
        }
      }
      FplLeague: {
        payload: Prisma.$FplLeaguePayload<ExtArgs>
        fields: Prisma.FplLeagueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplLeagueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplLeagueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>
          }
          findFirst: {
            args: Prisma.FplLeagueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplLeagueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>
          }
          findMany: {
            args: Prisma.FplLeagueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>[]
          }
          create: {
            args: Prisma.FplLeagueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>
          }
          createMany: {
            args: Prisma.FplLeagueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplLeagueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>[]
          }
          delete: {
            args: Prisma.FplLeagueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>
          }
          update: {
            args: Prisma.FplLeagueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>
          }
          deleteMany: {
            args: Prisma.FplLeagueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplLeagueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplLeagueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>[]
          }
          upsert: {
            args: Prisma.FplLeagueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeaguePayload>
          }
          aggregate: {
            args: Prisma.FplLeagueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplLeague>
          }
          groupBy: {
            args: Prisma.FplLeagueGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplLeagueGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplLeagueCountArgs<ExtArgs>
            result: $Utils.Optional<FplLeagueCountAggregateOutputType> | number
          }
        }
      }
      FplLeagueEntry: {
        payload: Prisma.$FplLeagueEntryPayload<ExtArgs>
        fields: Prisma.FplLeagueEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplLeagueEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplLeagueEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>
          }
          findFirst: {
            args: Prisma.FplLeagueEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplLeagueEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>
          }
          findMany: {
            args: Prisma.FplLeagueEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>[]
          }
          create: {
            args: Prisma.FplLeagueEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>
          }
          createMany: {
            args: Prisma.FplLeagueEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplLeagueEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>[]
          }
          delete: {
            args: Prisma.FplLeagueEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>
          }
          update: {
            args: Prisma.FplLeagueEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>
          }
          deleteMany: {
            args: Prisma.FplLeagueEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplLeagueEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplLeagueEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>[]
          }
          upsert: {
            args: Prisma.FplLeagueEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplLeagueEntryPayload>
          }
          aggregate: {
            args: Prisma.FplLeagueEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplLeagueEntry>
          }
          groupBy: {
            args: Prisma.FplLeagueEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplLeagueEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplLeagueEntryCountArgs<ExtArgs>
            result: $Utils.Optional<FplLeagueEntryCountAggregateOutputType> | number
          }
        }
      }
      FplEntrySnapshot: {
        payload: Prisma.$FplEntrySnapshotPayload<ExtArgs>
        fields: Prisma.FplEntrySnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplEntrySnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplEntrySnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>
          }
          findFirst: {
            args: Prisma.FplEntrySnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplEntrySnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>
          }
          findMany: {
            args: Prisma.FplEntrySnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>[]
          }
          create: {
            args: Prisma.FplEntrySnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>
          }
          createMany: {
            args: Prisma.FplEntrySnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplEntrySnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>[]
          }
          delete: {
            args: Prisma.FplEntrySnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>
          }
          update: {
            args: Prisma.FplEntrySnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>
          }
          deleteMany: {
            args: Prisma.FplEntrySnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplEntrySnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplEntrySnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>[]
          }
          upsert: {
            args: Prisma.FplEntrySnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntrySnapshotPayload>
          }
          aggregate: {
            args: Prisma.FplEntrySnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplEntrySnapshot>
          }
          groupBy: {
            args: Prisma.FplEntrySnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplEntrySnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplEntrySnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<FplEntrySnapshotCountAggregateOutputType> | number
          }
        }
      }
      FplEntryPick: {
        payload: Prisma.$FplEntryPickPayload<ExtArgs>
        fields: Prisma.FplEntryPickFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplEntryPickFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplEntryPickFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>
          }
          findFirst: {
            args: Prisma.FplEntryPickFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplEntryPickFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>
          }
          findMany: {
            args: Prisma.FplEntryPickFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>[]
          }
          create: {
            args: Prisma.FplEntryPickCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>
          }
          createMany: {
            args: Prisma.FplEntryPickCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplEntryPickCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>[]
          }
          delete: {
            args: Prisma.FplEntryPickDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>
          }
          update: {
            args: Prisma.FplEntryPickUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>
          }
          deleteMany: {
            args: Prisma.FplEntryPickDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplEntryPickUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplEntryPickUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>[]
          }
          upsert: {
            args: Prisma.FplEntryPickUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryPickPayload>
          }
          aggregate: {
            args: Prisma.FplEntryPickAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplEntryPick>
          }
          groupBy: {
            args: Prisma.FplEntryPickGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplEntryPickGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplEntryPickCountArgs<ExtArgs>
            result: $Utils.Optional<FplEntryPickCountAggregateOutputType> | number
          }
        }
      }
      FplEntryTransfer: {
        payload: Prisma.$FplEntryTransferPayload<ExtArgs>
        fields: Prisma.FplEntryTransferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplEntryTransferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplEntryTransferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>
          }
          findFirst: {
            args: Prisma.FplEntryTransferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplEntryTransferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>
          }
          findMany: {
            args: Prisma.FplEntryTransferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>[]
          }
          create: {
            args: Prisma.FplEntryTransferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>
          }
          createMany: {
            args: Prisma.FplEntryTransferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplEntryTransferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>[]
          }
          delete: {
            args: Prisma.FplEntryTransferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>
          }
          update: {
            args: Prisma.FplEntryTransferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>
          }
          deleteMany: {
            args: Prisma.FplEntryTransferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplEntryTransferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplEntryTransferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>[]
          }
          upsert: {
            args: Prisma.FplEntryTransferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryTransferPayload>
          }
          aggregate: {
            args: Prisma.FplEntryTransferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplEntryTransfer>
          }
          groupBy: {
            args: Prisma.FplEntryTransferGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplEntryTransferGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplEntryTransferCountArgs<ExtArgs>
            result: $Utils.Optional<FplEntryTransferCountAggregateOutputType> | number
          }
        }
      }
      FplEntryBehaviourProfile: {
        payload: Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>
        fields: Prisma.FplEntryBehaviourProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplEntryBehaviourProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplEntryBehaviourProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>
          }
          findFirst: {
            args: Prisma.FplEntryBehaviourProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplEntryBehaviourProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>
          }
          findMany: {
            args: Prisma.FplEntryBehaviourProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>[]
          }
          create: {
            args: Prisma.FplEntryBehaviourProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>
          }
          createMany: {
            args: Prisma.FplEntryBehaviourProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplEntryBehaviourProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>[]
          }
          delete: {
            args: Prisma.FplEntryBehaviourProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>
          }
          update: {
            args: Prisma.FplEntryBehaviourProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>
          }
          deleteMany: {
            args: Prisma.FplEntryBehaviourProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplEntryBehaviourProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplEntryBehaviourProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>[]
          }
          upsert: {
            args: Prisma.FplEntryBehaviourProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplEntryBehaviourProfilePayload>
          }
          aggregate: {
            args: Prisma.FplEntryBehaviourProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplEntryBehaviourProfile>
          }
          groupBy: {
            args: Prisma.FplEntryBehaviourProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplEntryBehaviourProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplEntryBehaviourProfileCountArgs<ExtArgs>
            result: $Utils.Optional<FplEntryBehaviourProfileCountAggregateOutputType> | number
          }
        }
      }
      FplFixture: {
        payload: Prisma.$FplFixturePayload<ExtArgs>
        fields: Prisma.FplFixtureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FplFixtureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FplFixtureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>
          }
          findFirst: {
            args: Prisma.FplFixtureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FplFixtureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>
          }
          findMany: {
            args: Prisma.FplFixtureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>[]
          }
          create: {
            args: Prisma.FplFixtureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>
          }
          createMany: {
            args: Prisma.FplFixtureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FplFixtureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>[]
          }
          delete: {
            args: Prisma.FplFixtureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>
          }
          update: {
            args: Prisma.FplFixtureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>
          }
          deleteMany: {
            args: Prisma.FplFixtureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FplFixtureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FplFixtureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>[]
          }
          upsert: {
            args: Prisma.FplFixtureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FplFixturePayload>
          }
          aggregate: {
            args: Prisma.FplFixtureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFplFixture>
          }
          groupBy: {
            args: Prisma.FplFixtureGroupByArgs<ExtArgs>
            result: $Utils.Optional<FplFixtureGroupByOutputType>[]
          }
          count: {
            args: Prisma.FplFixtureCountArgs<ExtArgs>
            result: $Utils.Optional<FplFixtureCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    fplBootstrapSnapshot?: FplBootstrapSnapshotOmit
    fplTeam?: FplTeamOmit
    fplPosition?: FplPositionOmit
    fplPlayer?: FplPlayerOmit
    fplGameweek?: FplGameweekOmit
    fplLeague?: FplLeagueOmit
    fplLeagueEntry?: FplLeagueEntryOmit
    fplEntrySnapshot?: FplEntrySnapshotOmit
    fplEntryPick?: FplEntryPickOmit
    fplEntryTransfer?: FplEntryTransferOmit
    fplEntryBehaviourProfile?: FplEntryBehaviourProfileOmit
    fplFixture?: FplFixtureOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FplTeamCountOutputType
   */

  export type FplTeamCountOutputType = {
    players: number
  }

  export type FplTeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | FplTeamCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * FplTeamCountOutputType without action
   */
  export type FplTeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeamCountOutputType
     */
    select?: FplTeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplTeamCountOutputType without action
   */
  export type FplTeamCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplPlayerWhereInput
  }


  /**
   * Count Type FplPositionCountOutputType
   */

  export type FplPositionCountOutputType = {
    players: number
  }

  export type FplPositionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | FplPositionCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * FplPositionCountOutputType without action
   */
  export type FplPositionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPositionCountOutputType
     */
    select?: FplPositionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplPositionCountOutputType without action
   */
  export type FplPositionCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplPlayerWhereInput
  }


  /**
   * Count Type FplPlayerCountOutputType
   */

  export type FplPlayerCountOutputType = {
    transfersIn: number
    transfersOut: number
  }

  export type FplPlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transfersIn?: boolean | FplPlayerCountOutputTypeCountTransfersInArgs
    transfersOut?: boolean | FplPlayerCountOutputTypeCountTransfersOutArgs
  }

  // Custom InputTypes
  /**
   * FplPlayerCountOutputType without action
   */
  export type FplPlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayerCountOutputType
     */
    select?: FplPlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplPlayerCountOutputType without action
   */
  export type FplPlayerCountOutputTypeCountTransfersInArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryTransferWhereInput
  }

  /**
   * FplPlayerCountOutputType without action
   */
  export type FplPlayerCountOutputTypeCountTransfersOutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryTransferWhereInput
  }


  /**
   * Count Type FplGameweekCountOutputType
   */

  export type FplGameweekCountOutputType = {
    entrySnapshots: number
    entryTransfers: number
  }

  export type FplGameweekCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entrySnapshots?: boolean | FplGameweekCountOutputTypeCountEntrySnapshotsArgs
    entryTransfers?: boolean | FplGameweekCountOutputTypeCountEntryTransfersArgs
  }

  // Custom InputTypes
  /**
   * FplGameweekCountOutputType without action
   */
  export type FplGameweekCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweekCountOutputType
     */
    select?: FplGameweekCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplGameweekCountOutputType without action
   */
  export type FplGameweekCountOutputTypeCountEntrySnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntrySnapshotWhereInput
  }

  /**
   * FplGameweekCountOutputType without action
   */
  export type FplGameweekCountOutputTypeCountEntryTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryTransferWhereInput
  }


  /**
   * Count Type FplLeagueCountOutputType
   */

  export type FplLeagueCountOutputType = {
    entries: number
    entrySnapshots: number
  }

  export type FplLeagueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | FplLeagueCountOutputTypeCountEntriesArgs
    entrySnapshots?: boolean | FplLeagueCountOutputTypeCountEntrySnapshotsArgs
  }

  // Custom InputTypes
  /**
   * FplLeagueCountOutputType without action
   */
  export type FplLeagueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueCountOutputType
     */
    select?: FplLeagueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplLeagueCountOutputType without action
   */
  export type FplLeagueCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplLeagueEntryWhereInput
  }

  /**
   * FplLeagueCountOutputType without action
   */
  export type FplLeagueCountOutputTypeCountEntrySnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntrySnapshotWhereInput
  }


  /**
   * Count Type FplLeagueEntryCountOutputType
   */

  export type FplLeagueEntryCountOutputType = {
    transfers: number
  }

  export type FplLeagueEntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transfers?: boolean | FplLeagueEntryCountOutputTypeCountTransfersArgs
  }

  // Custom InputTypes
  /**
   * FplLeagueEntryCountOutputType without action
   */
  export type FplLeagueEntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntryCountOutputType
     */
    select?: FplLeagueEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplLeagueEntryCountOutputType without action
   */
  export type FplLeagueEntryCountOutputTypeCountTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryTransferWhereInput
  }


  /**
   * Count Type FplEntrySnapshotCountOutputType
   */

  export type FplEntrySnapshotCountOutputType = {
    picks: number
  }

  export type FplEntrySnapshotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    picks?: boolean | FplEntrySnapshotCountOutputTypeCountPicksArgs
  }

  // Custom InputTypes
  /**
   * FplEntrySnapshotCountOutputType without action
   */
  export type FplEntrySnapshotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshotCountOutputType
     */
    select?: FplEntrySnapshotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FplEntrySnapshotCountOutputType without action
   */
  export type FplEntrySnapshotCountOutputTypeCountPicksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryPickWhereInput
  }


  /**
   * Models
   */

  /**
   * Model FplBootstrapSnapshot
   */

  export type AggregateFplBootstrapSnapshot = {
    _count: FplBootstrapSnapshotCountAggregateOutputType | null
    _avg: FplBootstrapSnapshotAvgAggregateOutputType | null
    _sum: FplBootstrapSnapshotSumAggregateOutputType | null
    _min: FplBootstrapSnapshotMinAggregateOutputType | null
    _max: FplBootstrapSnapshotMaxAggregateOutputType | null
  }

  export type FplBootstrapSnapshotAvgAggregateOutputType = {
    teamsCount: number | null
    playersCount: number | null
    positionsCount: number | null
    gameweeksCount: number | null
  }

  export type FplBootstrapSnapshotSumAggregateOutputType = {
    teamsCount: number | null
    playersCount: number | null
    positionsCount: number | null
    gameweeksCount: number | null
  }

  export type FplBootstrapSnapshotMinAggregateOutputType = {
    id: string | null
    fetchedAt: Date | null
    source: string | null
    hash: string | null
    teamsCount: number | null
    playersCount: number | null
    positionsCount: number | null
    gameweeksCount: number | null
  }

  export type FplBootstrapSnapshotMaxAggregateOutputType = {
    id: string | null
    fetchedAt: Date | null
    source: string | null
    hash: string | null
    teamsCount: number | null
    playersCount: number | null
    positionsCount: number | null
    gameweeksCount: number | null
  }

  export type FplBootstrapSnapshotCountAggregateOutputType = {
    id: number
    fetchedAt: number
    source: number
    hash: number
    teamsCount: number
    playersCount: number
    positionsCount: number
    gameweeksCount: number
    _all: number
  }


  export type FplBootstrapSnapshotAvgAggregateInputType = {
    teamsCount?: true
    playersCount?: true
    positionsCount?: true
    gameweeksCount?: true
  }

  export type FplBootstrapSnapshotSumAggregateInputType = {
    teamsCount?: true
    playersCount?: true
    positionsCount?: true
    gameweeksCount?: true
  }

  export type FplBootstrapSnapshotMinAggregateInputType = {
    id?: true
    fetchedAt?: true
    source?: true
    hash?: true
    teamsCount?: true
    playersCount?: true
    positionsCount?: true
    gameweeksCount?: true
  }

  export type FplBootstrapSnapshotMaxAggregateInputType = {
    id?: true
    fetchedAt?: true
    source?: true
    hash?: true
    teamsCount?: true
    playersCount?: true
    positionsCount?: true
    gameweeksCount?: true
  }

  export type FplBootstrapSnapshotCountAggregateInputType = {
    id?: true
    fetchedAt?: true
    source?: true
    hash?: true
    teamsCount?: true
    playersCount?: true
    positionsCount?: true
    gameweeksCount?: true
    _all?: true
  }

  export type FplBootstrapSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplBootstrapSnapshot to aggregate.
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplBootstrapSnapshots to fetch.
     */
    orderBy?: FplBootstrapSnapshotOrderByWithRelationInput | FplBootstrapSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplBootstrapSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplBootstrapSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplBootstrapSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplBootstrapSnapshots
    **/
    _count?: true | FplBootstrapSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplBootstrapSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplBootstrapSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplBootstrapSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplBootstrapSnapshotMaxAggregateInputType
  }

  export type GetFplBootstrapSnapshotAggregateType<T extends FplBootstrapSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateFplBootstrapSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplBootstrapSnapshot[P]>
      : GetScalarType<T[P], AggregateFplBootstrapSnapshot[P]>
  }




  export type FplBootstrapSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplBootstrapSnapshotWhereInput
    orderBy?: FplBootstrapSnapshotOrderByWithAggregationInput | FplBootstrapSnapshotOrderByWithAggregationInput[]
    by: FplBootstrapSnapshotScalarFieldEnum[] | FplBootstrapSnapshotScalarFieldEnum
    having?: FplBootstrapSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplBootstrapSnapshotCountAggregateInputType | true
    _avg?: FplBootstrapSnapshotAvgAggregateInputType
    _sum?: FplBootstrapSnapshotSumAggregateInputType
    _min?: FplBootstrapSnapshotMinAggregateInputType
    _max?: FplBootstrapSnapshotMaxAggregateInputType
  }

  export type FplBootstrapSnapshotGroupByOutputType = {
    id: string
    fetchedAt: Date
    source: string
    hash: string | null
    teamsCount: number
    playersCount: number
    positionsCount: number
    gameweeksCount: number
    _count: FplBootstrapSnapshotCountAggregateOutputType | null
    _avg: FplBootstrapSnapshotAvgAggregateOutputType | null
    _sum: FplBootstrapSnapshotSumAggregateOutputType | null
    _min: FplBootstrapSnapshotMinAggregateOutputType | null
    _max: FplBootstrapSnapshotMaxAggregateOutputType | null
  }

  type GetFplBootstrapSnapshotGroupByPayload<T extends FplBootstrapSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplBootstrapSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplBootstrapSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplBootstrapSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], FplBootstrapSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type FplBootstrapSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fetchedAt?: boolean
    source?: boolean
    hash?: boolean
    teamsCount?: boolean
    playersCount?: boolean
    positionsCount?: boolean
    gameweeksCount?: boolean
  }, ExtArgs["result"]["fplBootstrapSnapshot"]>

  export type FplBootstrapSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fetchedAt?: boolean
    source?: boolean
    hash?: boolean
    teamsCount?: boolean
    playersCount?: boolean
    positionsCount?: boolean
    gameweeksCount?: boolean
  }, ExtArgs["result"]["fplBootstrapSnapshot"]>

  export type FplBootstrapSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fetchedAt?: boolean
    source?: boolean
    hash?: boolean
    teamsCount?: boolean
    playersCount?: boolean
    positionsCount?: boolean
    gameweeksCount?: boolean
  }, ExtArgs["result"]["fplBootstrapSnapshot"]>

  export type FplBootstrapSnapshotSelectScalar = {
    id?: boolean
    fetchedAt?: boolean
    source?: boolean
    hash?: boolean
    teamsCount?: boolean
    playersCount?: boolean
    positionsCount?: boolean
    gameweeksCount?: boolean
  }

  export type FplBootstrapSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fetchedAt" | "source" | "hash" | "teamsCount" | "playersCount" | "positionsCount" | "gameweeksCount", ExtArgs["result"]["fplBootstrapSnapshot"]>

  export type $FplBootstrapSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplBootstrapSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fetchedAt: Date
      source: string
      hash: string | null
      teamsCount: number
      playersCount: number
      positionsCount: number
      gameweeksCount: number
    }, ExtArgs["result"]["fplBootstrapSnapshot"]>
    composites: {}
  }

  type FplBootstrapSnapshotGetPayload<S extends boolean | null | undefined | FplBootstrapSnapshotDefaultArgs> = $Result.GetResult<Prisma.$FplBootstrapSnapshotPayload, S>

  type FplBootstrapSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplBootstrapSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplBootstrapSnapshotCountAggregateInputType | true
    }

  export interface FplBootstrapSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplBootstrapSnapshot'], meta: { name: 'FplBootstrapSnapshot' } }
    /**
     * Find zero or one FplBootstrapSnapshot that matches the filter.
     * @param {FplBootstrapSnapshotFindUniqueArgs} args - Arguments to find a FplBootstrapSnapshot
     * @example
     * // Get one FplBootstrapSnapshot
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplBootstrapSnapshotFindUniqueArgs>(args: SelectSubset<T, FplBootstrapSnapshotFindUniqueArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplBootstrapSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplBootstrapSnapshotFindUniqueOrThrowArgs} args - Arguments to find a FplBootstrapSnapshot
     * @example
     * // Get one FplBootstrapSnapshot
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplBootstrapSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, FplBootstrapSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplBootstrapSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotFindFirstArgs} args - Arguments to find a FplBootstrapSnapshot
     * @example
     * // Get one FplBootstrapSnapshot
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplBootstrapSnapshotFindFirstArgs>(args?: SelectSubset<T, FplBootstrapSnapshotFindFirstArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplBootstrapSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotFindFirstOrThrowArgs} args - Arguments to find a FplBootstrapSnapshot
     * @example
     * // Get one FplBootstrapSnapshot
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplBootstrapSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, FplBootstrapSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplBootstrapSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplBootstrapSnapshots
     * const fplBootstrapSnapshots = await prisma.fplBootstrapSnapshot.findMany()
     * 
     * // Get first 10 FplBootstrapSnapshots
     * const fplBootstrapSnapshots = await prisma.fplBootstrapSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplBootstrapSnapshotWithIdOnly = await prisma.fplBootstrapSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplBootstrapSnapshotFindManyArgs>(args?: SelectSubset<T, FplBootstrapSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplBootstrapSnapshot.
     * @param {FplBootstrapSnapshotCreateArgs} args - Arguments to create a FplBootstrapSnapshot.
     * @example
     * // Create one FplBootstrapSnapshot
     * const FplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.create({
     *   data: {
     *     // ... data to create a FplBootstrapSnapshot
     *   }
     * })
     * 
     */
    create<T extends FplBootstrapSnapshotCreateArgs>(args: SelectSubset<T, FplBootstrapSnapshotCreateArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplBootstrapSnapshots.
     * @param {FplBootstrapSnapshotCreateManyArgs} args - Arguments to create many FplBootstrapSnapshots.
     * @example
     * // Create many FplBootstrapSnapshots
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplBootstrapSnapshotCreateManyArgs>(args?: SelectSubset<T, FplBootstrapSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplBootstrapSnapshots and returns the data saved in the database.
     * @param {FplBootstrapSnapshotCreateManyAndReturnArgs} args - Arguments to create many FplBootstrapSnapshots.
     * @example
     * // Create many FplBootstrapSnapshots
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplBootstrapSnapshots and only return the `id`
     * const fplBootstrapSnapshotWithIdOnly = await prisma.fplBootstrapSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplBootstrapSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, FplBootstrapSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplBootstrapSnapshot.
     * @param {FplBootstrapSnapshotDeleteArgs} args - Arguments to delete one FplBootstrapSnapshot.
     * @example
     * // Delete one FplBootstrapSnapshot
     * const FplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.delete({
     *   where: {
     *     // ... filter to delete one FplBootstrapSnapshot
     *   }
     * })
     * 
     */
    delete<T extends FplBootstrapSnapshotDeleteArgs>(args: SelectSubset<T, FplBootstrapSnapshotDeleteArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplBootstrapSnapshot.
     * @param {FplBootstrapSnapshotUpdateArgs} args - Arguments to update one FplBootstrapSnapshot.
     * @example
     * // Update one FplBootstrapSnapshot
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplBootstrapSnapshotUpdateArgs>(args: SelectSubset<T, FplBootstrapSnapshotUpdateArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplBootstrapSnapshots.
     * @param {FplBootstrapSnapshotDeleteManyArgs} args - Arguments to filter FplBootstrapSnapshots to delete.
     * @example
     * // Delete a few FplBootstrapSnapshots
     * const { count } = await prisma.fplBootstrapSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplBootstrapSnapshotDeleteManyArgs>(args?: SelectSubset<T, FplBootstrapSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplBootstrapSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplBootstrapSnapshots
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplBootstrapSnapshotUpdateManyArgs>(args: SelectSubset<T, FplBootstrapSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplBootstrapSnapshots and returns the data updated in the database.
     * @param {FplBootstrapSnapshotUpdateManyAndReturnArgs} args - Arguments to update many FplBootstrapSnapshots.
     * @example
     * // Update many FplBootstrapSnapshots
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplBootstrapSnapshots and only return the `id`
     * const fplBootstrapSnapshotWithIdOnly = await prisma.fplBootstrapSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplBootstrapSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, FplBootstrapSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplBootstrapSnapshot.
     * @param {FplBootstrapSnapshotUpsertArgs} args - Arguments to update or create a FplBootstrapSnapshot.
     * @example
     * // Update or create a FplBootstrapSnapshot
     * const fplBootstrapSnapshot = await prisma.fplBootstrapSnapshot.upsert({
     *   create: {
     *     // ... data to create a FplBootstrapSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplBootstrapSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends FplBootstrapSnapshotUpsertArgs>(args: SelectSubset<T, FplBootstrapSnapshotUpsertArgs<ExtArgs>>): Prisma__FplBootstrapSnapshotClient<$Result.GetResult<Prisma.$FplBootstrapSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplBootstrapSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotCountArgs} args - Arguments to filter FplBootstrapSnapshots to count.
     * @example
     * // Count the number of FplBootstrapSnapshots
     * const count = await prisma.fplBootstrapSnapshot.count({
     *   where: {
     *     // ... the filter for the FplBootstrapSnapshots we want to count
     *   }
     * })
    **/
    count<T extends FplBootstrapSnapshotCountArgs>(
      args?: Subset<T, FplBootstrapSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplBootstrapSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplBootstrapSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplBootstrapSnapshotAggregateArgs>(args: Subset<T, FplBootstrapSnapshotAggregateArgs>): Prisma.PrismaPromise<GetFplBootstrapSnapshotAggregateType<T>>

    /**
     * Group by FplBootstrapSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplBootstrapSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplBootstrapSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplBootstrapSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: FplBootstrapSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplBootstrapSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplBootstrapSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplBootstrapSnapshot model
   */
  readonly fields: FplBootstrapSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplBootstrapSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplBootstrapSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplBootstrapSnapshot model
   */
  interface FplBootstrapSnapshotFieldRefs {
    readonly id: FieldRef<"FplBootstrapSnapshot", 'String'>
    readonly fetchedAt: FieldRef<"FplBootstrapSnapshot", 'DateTime'>
    readonly source: FieldRef<"FplBootstrapSnapshot", 'String'>
    readonly hash: FieldRef<"FplBootstrapSnapshot", 'String'>
    readonly teamsCount: FieldRef<"FplBootstrapSnapshot", 'Int'>
    readonly playersCount: FieldRef<"FplBootstrapSnapshot", 'Int'>
    readonly positionsCount: FieldRef<"FplBootstrapSnapshot", 'Int'>
    readonly gameweeksCount: FieldRef<"FplBootstrapSnapshot", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * FplBootstrapSnapshot findUnique
   */
  export type FplBootstrapSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which FplBootstrapSnapshot to fetch.
     */
    where: FplBootstrapSnapshotWhereUniqueInput
  }

  /**
   * FplBootstrapSnapshot findUniqueOrThrow
   */
  export type FplBootstrapSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which FplBootstrapSnapshot to fetch.
     */
    where: FplBootstrapSnapshotWhereUniqueInput
  }

  /**
   * FplBootstrapSnapshot findFirst
   */
  export type FplBootstrapSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which FplBootstrapSnapshot to fetch.
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplBootstrapSnapshots to fetch.
     */
    orderBy?: FplBootstrapSnapshotOrderByWithRelationInput | FplBootstrapSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplBootstrapSnapshots.
     */
    cursor?: FplBootstrapSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplBootstrapSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplBootstrapSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplBootstrapSnapshots.
     */
    distinct?: FplBootstrapSnapshotScalarFieldEnum | FplBootstrapSnapshotScalarFieldEnum[]
  }

  /**
   * FplBootstrapSnapshot findFirstOrThrow
   */
  export type FplBootstrapSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which FplBootstrapSnapshot to fetch.
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplBootstrapSnapshots to fetch.
     */
    orderBy?: FplBootstrapSnapshotOrderByWithRelationInput | FplBootstrapSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplBootstrapSnapshots.
     */
    cursor?: FplBootstrapSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplBootstrapSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplBootstrapSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplBootstrapSnapshots.
     */
    distinct?: FplBootstrapSnapshotScalarFieldEnum | FplBootstrapSnapshotScalarFieldEnum[]
  }

  /**
   * FplBootstrapSnapshot findMany
   */
  export type FplBootstrapSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which FplBootstrapSnapshots to fetch.
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplBootstrapSnapshots to fetch.
     */
    orderBy?: FplBootstrapSnapshotOrderByWithRelationInput | FplBootstrapSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplBootstrapSnapshots.
     */
    cursor?: FplBootstrapSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplBootstrapSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplBootstrapSnapshots.
     */
    skip?: number
    distinct?: FplBootstrapSnapshotScalarFieldEnum | FplBootstrapSnapshotScalarFieldEnum[]
  }

  /**
   * FplBootstrapSnapshot create
   */
  export type FplBootstrapSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a FplBootstrapSnapshot.
     */
    data: XOR<FplBootstrapSnapshotCreateInput, FplBootstrapSnapshotUncheckedCreateInput>
  }

  /**
   * FplBootstrapSnapshot createMany
   */
  export type FplBootstrapSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplBootstrapSnapshots.
     */
    data: FplBootstrapSnapshotCreateManyInput | FplBootstrapSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplBootstrapSnapshot createManyAndReturn
   */
  export type FplBootstrapSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many FplBootstrapSnapshots.
     */
    data: FplBootstrapSnapshotCreateManyInput | FplBootstrapSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplBootstrapSnapshot update
   */
  export type FplBootstrapSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a FplBootstrapSnapshot.
     */
    data: XOR<FplBootstrapSnapshotUpdateInput, FplBootstrapSnapshotUncheckedUpdateInput>
    /**
     * Choose, which FplBootstrapSnapshot to update.
     */
    where: FplBootstrapSnapshotWhereUniqueInput
  }

  /**
   * FplBootstrapSnapshot updateMany
   */
  export type FplBootstrapSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplBootstrapSnapshots.
     */
    data: XOR<FplBootstrapSnapshotUpdateManyMutationInput, FplBootstrapSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which FplBootstrapSnapshots to update
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * Limit how many FplBootstrapSnapshots to update.
     */
    limit?: number
  }

  /**
   * FplBootstrapSnapshot updateManyAndReturn
   */
  export type FplBootstrapSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update FplBootstrapSnapshots.
     */
    data: XOR<FplBootstrapSnapshotUpdateManyMutationInput, FplBootstrapSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which FplBootstrapSnapshots to update
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * Limit how many FplBootstrapSnapshots to update.
     */
    limit?: number
  }

  /**
   * FplBootstrapSnapshot upsert
   */
  export type FplBootstrapSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the FplBootstrapSnapshot to update in case it exists.
     */
    where: FplBootstrapSnapshotWhereUniqueInput
    /**
     * In case the FplBootstrapSnapshot found by the `where` argument doesn't exist, create a new FplBootstrapSnapshot with this data.
     */
    create: XOR<FplBootstrapSnapshotCreateInput, FplBootstrapSnapshotUncheckedCreateInput>
    /**
     * In case the FplBootstrapSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplBootstrapSnapshotUpdateInput, FplBootstrapSnapshotUncheckedUpdateInput>
  }

  /**
   * FplBootstrapSnapshot delete
   */
  export type FplBootstrapSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
    /**
     * Filter which FplBootstrapSnapshot to delete.
     */
    where: FplBootstrapSnapshotWhereUniqueInput
  }

  /**
   * FplBootstrapSnapshot deleteMany
   */
  export type FplBootstrapSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplBootstrapSnapshots to delete
     */
    where?: FplBootstrapSnapshotWhereInput
    /**
     * Limit how many FplBootstrapSnapshots to delete.
     */
    limit?: number
  }

  /**
   * FplBootstrapSnapshot without action
   */
  export type FplBootstrapSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplBootstrapSnapshot
     */
    select?: FplBootstrapSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplBootstrapSnapshot
     */
    omit?: FplBootstrapSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model FplTeam
   */

  export type AggregateFplTeam = {
    _count: FplTeamCountAggregateOutputType | null
    _avg: FplTeamAvgAggregateOutputType | null
    _sum: FplTeamSumAggregateOutputType | null
    _min: FplTeamMinAggregateOutputType | null
    _max: FplTeamMaxAggregateOutputType | null
  }

  export type FplTeamAvgAggregateOutputType = {
    id: number | null
    code: number | null
  }

  export type FplTeamSumAggregateOutputType = {
    id: number | null
    code: number | null
  }

  export type FplTeamMinAggregateOutputType = {
    id: number | null
    name: string | null
    shortName: string | null
    code: number | null
    updatedAt: Date | null
  }

  export type FplTeamMaxAggregateOutputType = {
    id: number | null
    name: string | null
    shortName: string | null
    code: number | null
    updatedAt: Date | null
  }

  export type FplTeamCountAggregateOutputType = {
    id: number
    name: number
    shortName: number
    code: number
    updatedAt: number
    _all: number
  }


  export type FplTeamAvgAggregateInputType = {
    id?: true
    code?: true
  }

  export type FplTeamSumAggregateInputType = {
    id?: true
    code?: true
  }

  export type FplTeamMinAggregateInputType = {
    id?: true
    name?: true
    shortName?: true
    code?: true
    updatedAt?: true
  }

  export type FplTeamMaxAggregateInputType = {
    id?: true
    name?: true
    shortName?: true
    code?: true
    updatedAt?: true
  }

  export type FplTeamCountAggregateInputType = {
    id?: true
    name?: true
    shortName?: true
    code?: true
    updatedAt?: true
    _all?: true
  }

  export type FplTeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplTeam to aggregate.
     */
    where?: FplTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplTeams to fetch.
     */
    orderBy?: FplTeamOrderByWithRelationInput | FplTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplTeams
    **/
    _count?: true | FplTeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplTeamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplTeamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplTeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplTeamMaxAggregateInputType
  }

  export type GetFplTeamAggregateType<T extends FplTeamAggregateArgs> = {
        [P in keyof T & keyof AggregateFplTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplTeam[P]>
      : GetScalarType<T[P], AggregateFplTeam[P]>
  }




  export type FplTeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplTeamWhereInput
    orderBy?: FplTeamOrderByWithAggregationInput | FplTeamOrderByWithAggregationInput[]
    by: FplTeamScalarFieldEnum[] | FplTeamScalarFieldEnum
    having?: FplTeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplTeamCountAggregateInputType | true
    _avg?: FplTeamAvgAggregateInputType
    _sum?: FplTeamSumAggregateInputType
    _min?: FplTeamMinAggregateInputType
    _max?: FplTeamMaxAggregateInputType
  }

  export type FplTeamGroupByOutputType = {
    id: number
    name: string
    shortName: string
    code: number | null
    updatedAt: Date
    _count: FplTeamCountAggregateOutputType | null
    _avg: FplTeamAvgAggregateOutputType | null
    _sum: FplTeamSumAggregateOutputType | null
    _min: FplTeamMinAggregateOutputType | null
    _max: FplTeamMaxAggregateOutputType | null
  }

  type GetFplTeamGroupByPayload<T extends FplTeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplTeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplTeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplTeamGroupByOutputType[P]>
            : GetScalarType<T[P], FplTeamGroupByOutputType[P]>
        }
      >
    >


  export type FplTeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortName?: boolean
    code?: boolean
    updatedAt?: boolean
    players?: boolean | FplTeam$playersArgs<ExtArgs>
    _count?: boolean | FplTeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplTeam"]>

  export type FplTeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortName?: boolean
    code?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplTeam"]>

  export type FplTeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    shortName?: boolean
    code?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplTeam"]>

  export type FplTeamSelectScalar = {
    id?: boolean
    name?: boolean
    shortName?: boolean
    code?: boolean
    updatedAt?: boolean
  }

  export type FplTeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "shortName" | "code" | "updatedAt", ExtArgs["result"]["fplTeam"]>
  export type FplTeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | FplTeam$playersArgs<ExtArgs>
    _count?: boolean | FplTeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplTeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FplTeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FplTeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplTeam"
    objects: {
      players: Prisma.$FplPlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      shortName: string
      code: number | null
      updatedAt: Date
    }, ExtArgs["result"]["fplTeam"]>
    composites: {}
  }

  type FplTeamGetPayload<S extends boolean | null | undefined | FplTeamDefaultArgs> = $Result.GetResult<Prisma.$FplTeamPayload, S>

  type FplTeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplTeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplTeamCountAggregateInputType | true
    }

  export interface FplTeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplTeam'], meta: { name: 'FplTeam' } }
    /**
     * Find zero or one FplTeam that matches the filter.
     * @param {FplTeamFindUniqueArgs} args - Arguments to find a FplTeam
     * @example
     * // Get one FplTeam
     * const fplTeam = await prisma.fplTeam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplTeamFindUniqueArgs>(args: SelectSubset<T, FplTeamFindUniqueArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplTeam that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplTeamFindUniqueOrThrowArgs} args - Arguments to find a FplTeam
     * @example
     * // Get one FplTeam
     * const fplTeam = await prisma.fplTeam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplTeamFindUniqueOrThrowArgs>(args: SelectSubset<T, FplTeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplTeam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamFindFirstArgs} args - Arguments to find a FplTeam
     * @example
     * // Get one FplTeam
     * const fplTeam = await prisma.fplTeam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplTeamFindFirstArgs>(args?: SelectSubset<T, FplTeamFindFirstArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplTeam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamFindFirstOrThrowArgs} args - Arguments to find a FplTeam
     * @example
     * // Get one FplTeam
     * const fplTeam = await prisma.fplTeam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplTeamFindFirstOrThrowArgs>(args?: SelectSubset<T, FplTeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplTeams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplTeams
     * const fplTeams = await prisma.fplTeam.findMany()
     * 
     * // Get first 10 FplTeams
     * const fplTeams = await prisma.fplTeam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplTeamWithIdOnly = await prisma.fplTeam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplTeamFindManyArgs>(args?: SelectSubset<T, FplTeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplTeam.
     * @param {FplTeamCreateArgs} args - Arguments to create a FplTeam.
     * @example
     * // Create one FplTeam
     * const FplTeam = await prisma.fplTeam.create({
     *   data: {
     *     // ... data to create a FplTeam
     *   }
     * })
     * 
     */
    create<T extends FplTeamCreateArgs>(args: SelectSubset<T, FplTeamCreateArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplTeams.
     * @param {FplTeamCreateManyArgs} args - Arguments to create many FplTeams.
     * @example
     * // Create many FplTeams
     * const fplTeam = await prisma.fplTeam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplTeamCreateManyArgs>(args?: SelectSubset<T, FplTeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplTeams and returns the data saved in the database.
     * @param {FplTeamCreateManyAndReturnArgs} args - Arguments to create many FplTeams.
     * @example
     * // Create many FplTeams
     * const fplTeam = await prisma.fplTeam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplTeams and only return the `id`
     * const fplTeamWithIdOnly = await prisma.fplTeam.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplTeamCreateManyAndReturnArgs>(args?: SelectSubset<T, FplTeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplTeam.
     * @param {FplTeamDeleteArgs} args - Arguments to delete one FplTeam.
     * @example
     * // Delete one FplTeam
     * const FplTeam = await prisma.fplTeam.delete({
     *   where: {
     *     // ... filter to delete one FplTeam
     *   }
     * })
     * 
     */
    delete<T extends FplTeamDeleteArgs>(args: SelectSubset<T, FplTeamDeleteArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplTeam.
     * @param {FplTeamUpdateArgs} args - Arguments to update one FplTeam.
     * @example
     * // Update one FplTeam
     * const fplTeam = await prisma.fplTeam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplTeamUpdateArgs>(args: SelectSubset<T, FplTeamUpdateArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplTeams.
     * @param {FplTeamDeleteManyArgs} args - Arguments to filter FplTeams to delete.
     * @example
     * // Delete a few FplTeams
     * const { count } = await prisma.fplTeam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplTeamDeleteManyArgs>(args?: SelectSubset<T, FplTeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplTeams
     * const fplTeam = await prisma.fplTeam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplTeamUpdateManyArgs>(args: SelectSubset<T, FplTeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplTeams and returns the data updated in the database.
     * @param {FplTeamUpdateManyAndReturnArgs} args - Arguments to update many FplTeams.
     * @example
     * // Update many FplTeams
     * const fplTeam = await prisma.fplTeam.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplTeams and only return the `id`
     * const fplTeamWithIdOnly = await prisma.fplTeam.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplTeamUpdateManyAndReturnArgs>(args: SelectSubset<T, FplTeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplTeam.
     * @param {FplTeamUpsertArgs} args - Arguments to update or create a FplTeam.
     * @example
     * // Update or create a FplTeam
     * const fplTeam = await prisma.fplTeam.upsert({
     *   create: {
     *     // ... data to create a FplTeam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplTeam we want to update
     *   }
     * })
     */
    upsert<T extends FplTeamUpsertArgs>(args: SelectSubset<T, FplTeamUpsertArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamCountArgs} args - Arguments to filter FplTeams to count.
     * @example
     * // Count the number of FplTeams
     * const count = await prisma.fplTeam.count({
     *   where: {
     *     // ... the filter for the FplTeams we want to count
     *   }
     * })
    **/
    count<T extends FplTeamCountArgs>(
      args?: Subset<T, FplTeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplTeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplTeamAggregateArgs>(args: Subset<T, FplTeamAggregateArgs>): Prisma.PrismaPromise<GetFplTeamAggregateType<T>>

    /**
     * Group by FplTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplTeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplTeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplTeamGroupByArgs['orderBy'] }
        : { orderBy?: FplTeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplTeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplTeam model
   */
  readonly fields: FplTeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplTeam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplTeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends FplTeam$playersArgs<ExtArgs> = {}>(args?: Subset<T, FplTeam$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplTeam model
   */
  interface FplTeamFieldRefs {
    readonly id: FieldRef<"FplTeam", 'Int'>
    readonly name: FieldRef<"FplTeam", 'String'>
    readonly shortName: FieldRef<"FplTeam", 'String'>
    readonly code: FieldRef<"FplTeam", 'Int'>
    readonly updatedAt: FieldRef<"FplTeam", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplTeam findUnique
   */
  export type FplTeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * Filter, which FplTeam to fetch.
     */
    where: FplTeamWhereUniqueInput
  }

  /**
   * FplTeam findUniqueOrThrow
   */
  export type FplTeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * Filter, which FplTeam to fetch.
     */
    where: FplTeamWhereUniqueInput
  }

  /**
   * FplTeam findFirst
   */
  export type FplTeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * Filter, which FplTeam to fetch.
     */
    where?: FplTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplTeams to fetch.
     */
    orderBy?: FplTeamOrderByWithRelationInput | FplTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplTeams.
     */
    cursor?: FplTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplTeams.
     */
    distinct?: FplTeamScalarFieldEnum | FplTeamScalarFieldEnum[]
  }

  /**
   * FplTeam findFirstOrThrow
   */
  export type FplTeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * Filter, which FplTeam to fetch.
     */
    where?: FplTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplTeams to fetch.
     */
    orderBy?: FplTeamOrderByWithRelationInput | FplTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplTeams.
     */
    cursor?: FplTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplTeams.
     */
    distinct?: FplTeamScalarFieldEnum | FplTeamScalarFieldEnum[]
  }

  /**
   * FplTeam findMany
   */
  export type FplTeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * Filter, which FplTeams to fetch.
     */
    where?: FplTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplTeams to fetch.
     */
    orderBy?: FplTeamOrderByWithRelationInput | FplTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplTeams.
     */
    cursor?: FplTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplTeams.
     */
    skip?: number
    distinct?: FplTeamScalarFieldEnum | FplTeamScalarFieldEnum[]
  }

  /**
   * FplTeam create
   */
  export type FplTeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * The data needed to create a FplTeam.
     */
    data: XOR<FplTeamCreateInput, FplTeamUncheckedCreateInput>
  }

  /**
   * FplTeam createMany
   */
  export type FplTeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplTeams.
     */
    data: FplTeamCreateManyInput | FplTeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplTeam createManyAndReturn
   */
  export type FplTeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * The data used to create many FplTeams.
     */
    data: FplTeamCreateManyInput | FplTeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplTeam update
   */
  export type FplTeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * The data needed to update a FplTeam.
     */
    data: XOR<FplTeamUpdateInput, FplTeamUncheckedUpdateInput>
    /**
     * Choose, which FplTeam to update.
     */
    where: FplTeamWhereUniqueInput
  }

  /**
   * FplTeam updateMany
   */
  export type FplTeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplTeams.
     */
    data: XOR<FplTeamUpdateManyMutationInput, FplTeamUncheckedUpdateManyInput>
    /**
     * Filter which FplTeams to update
     */
    where?: FplTeamWhereInput
    /**
     * Limit how many FplTeams to update.
     */
    limit?: number
  }

  /**
   * FplTeam updateManyAndReturn
   */
  export type FplTeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * The data used to update FplTeams.
     */
    data: XOR<FplTeamUpdateManyMutationInput, FplTeamUncheckedUpdateManyInput>
    /**
     * Filter which FplTeams to update
     */
    where?: FplTeamWhereInput
    /**
     * Limit how many FplTeams to update.
     */
    limit?: number
  }

  /**
   * FplTeam upsert
   */
  export type FplTeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * The filter to search for the FplTeam to update in case it exists.
     */
    where: FplTeamWhereUniqueInput
    /**
     * In case the FplTeam found by the `where` argument doesn't exist, create a new FplTeam with this data.
     */
    create: XOR<FplTeamCreateInput, FplTeamUncheckedCreateInput>
    /**
     * In case the FplTeam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplTeamUpdateInput, FplTeamUncheckedUpdateInput>
  }

  /**
   * FplTeam delete
   */
  export type FplTeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
    /**
     * Filter which FplTeam to delete.
     */
    where: FplTeamWhereUniqueInput
  }

  /**
   * FplTeam deleteMany
   */
  export type FplTeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplTeams to delete
     */
    where?: FplTeamWhereInput
    /**
     * Limit how many FplTeams to delete.
     */
    limit?: number
  }

  /**
   * FplTeam.players
   */
  export type FplTeam$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    where?: FplPlayerWhereInput
    orderBy?: FplPlayerOrderByWithRelationInput | FplPlayerOrderByWithRelationInput[]
    cursor?: FplPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplPlayerScalarFieldEnum | FplPlayerScalarFieldEnum[]
  }

  /**
   * FplTeam without action
   */
  export type FplTeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplTeam
     */
    select?: FplTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplTeam
     */
    omit?: FplTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplTeamInclude<ExtArgs> | null
  }


  /**
   * Model FplPosition
   */

  export type AggregateFplPosition = {
    _count: FplPositionCountAggregateOutputType | null
    _avg: FplPositionAvgAggregateOutputType | null
    _sum: FplPositionSumAggregateOutputType | null
    _min: FplPositionMinAggregateOutputType | null
    _max: FplPositionMaxAggregateOutputType | null
  }

  export type FplPositionAvgAggregateOutputType = {
    id: number | null
  }

  export type FplPositionSumAggregateOutputType = {
    id: number | null
  }

  export type FplPositionMinAggregateOutputType = {
    id: number | null
    shortName: string | null
    updatedAt: Date | null
  }

  export type FplPositionMaxAggregateOutputType = {
    id: number | null
    shortName: string | null
    updatedAt: Date | null
  }

  export type FplPositionCountAggregateOutputType = {
    id: number
    shortName: number
    updatedAt: number
    _all: number
  }


  export type FplPositionAvgAggregateInputType = {
    id?: true
  }

  export type FplPositionSumAggregateInputType = {
    id?: true
  }

  export type FplPositionMinAggregateInputType = {
    id?: true
    shortName?: true
    updatedAt?: true
  }

  export type FplPositionMaxAggregateInputType = {
    id?: true
    shortName?: true
    updatedAt?: true
  }

  export type FplPositionCountAggregateInputType = {
    id?: true
    shortName?: true
    updatedAt?: true
    _all?: true
  }

  export type FplPositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplPosition to aggregate.
     */
    where?: FplPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPositions to fetch.
     */
    orderBy?: FplPositionOrderByWithRelationInput | FplPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplPositions
    **/
    _count?: true | FplPositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplPositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplPositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplPositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplPositionMaxAggregateInputType
  }

  export type GetFplPositionAggregateType<T extends FplPositionAggregateArgs> = {
        [P in keyof T & keyof AggregateFplPosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplPosition[P]>
      : GetScalarType<T[P], AggregateFplPosition[P]>
  }




  export type FplPositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplPositionWhereInput
    orderBy?: FplPositionOrderByWithAggregationInput | FplPositionOrderByWithAggregationInput[]
    by: FplPositionScalarFieldEnum[] | FplPositionScalarFieldEnum
    having?: FplPositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplPositionCountAggregateInputType | true
    _avg?: FplPositionAvgAggregateInputType
    _sum?: FplPositionSumAggregateInputType
    _min?: FplPositionMinAggregateInputType
    _max?: FplPositionMaxAggregateInputType
  }

  export type FplPositionGroupByOutputType = {
    id: number
    shortName: string
    updatedAt: Date
    _count: FplPositionCountAggregateOutputType | null
    _avg: FplPositionAvgAggregateOutputType | null
    _sum: FplPositionSumAggregateOutputType | null
    _min: FplPositionMinAggregateOutputType | null
    _max: FplPositionMaxAggregateOutputType | null
  }

  type GetFplPositionGroupByPayload<T extends FplPositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplPositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplPositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplPositionGroupByOutputType[P]>
            : GetScalarType<T[P], FplPositionGroupByOutputType[P]>
        }
      >
    >


  export type FplPositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shortName?: boolean
    updatedAt?: boolean
    players?: boolean | FplPosition$playersArgs<ExtArgs>
    _count?: boolean | FplPositionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplPosition"]>

  export type FplPositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shortName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplPosition"]>

  export type FplPositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shortName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplPosition"]>

  export type FplPositionSelectScalar = {
    id?: boolean
    shortName?: boolean
    updatedAt?: boolean
  }

  export type FplPositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shortName" | "updatedAt", ExtArgs["result"]["fplPosition"]>
  export type FplPositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | FplPosition$playersArgs<ExtArgs>
    _count?: boolean | FplPositionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplPositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FplPositionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FplPositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplPosition"
    objects: {
      players: Prisma.$FplPlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      shortName: string
      updatedAt: Date
    }, ExtArgs["result"]["fplPosition"]>
    composites: {}
  }

  type FplPositionGetPayload<S extends boolean | null | undefined | FplPositionDefaultArgs> = $Result.GetResult<Prisma.$FplPositionPayload, S>

  type FplPositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplPositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplPositionCountAggregateInputType | true
    }

  export interface FplPositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplPosition'], meta: { name: 'FplPosition' } }
    /**
     * Find zero or one FplPosition that matches the filter.
     * @param {FplPositionFindUniqueArgs} args - Arguments to find a FplPosition
     * @example
     * // Get one FplPosition
     * const fplPosition = await prisma.fplPosition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplPositionFindUniqueArgs>(args: SelectSubset<T, FplPositionFindUniqueArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplPosition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplPositionFindUniqueOrThrowArgs} args - Arguments to find a FplPosition
     * @example
     * // Get one FplPosition
     * const fplPosition = await prisma.fplPosition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplPositionFindUniqueOrThrowArgs>(args: SelectSubset<T, FplPositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplPosition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionFindFirstArgs} args - Arguments to find a FplPosition
     * @example
     * // Get one FplPosition
     * const fplPosition = await prisma.fplPosition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplPositionFindFirstArgs>(args?: SelectSubset<T, FplPositionFindFirstArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplPosition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionFindFirstOrThrowArgs} args - Arguments to find a FplPosition
     * @example
     * // Get one FplPosition
     * const fplPosition = await prisma.fplPosition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplPositionFindFirstOrThrowArgs>(args?: SelectSubset<T, FplPositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplPositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplPositions
     * const fplPositions = await prisma.fplPosition.findMany()
     * 
     * // Get first 10 FplPositions
     * const fplPositions = await prisma.fplPosition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplPositionWithIdOnly = await prisma.fplPosition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplPositionFindManyArgs>(args?: SelectSubset<T, FplPositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplPosition.
     * @param {FplPositionCreateArgs} args - Arguments to create a FplPosition.
     * @example
     * // Create one FplPosition
     * const FplPosition = await prisma.fplPosition.create({
     *   data: {
     *     // ... data to create a FplPosition
     *   }
     * })
     * 
     */
    create<T extends FplPositionCreateArgs>(args: SelectSubset<T, FplPositionCreateArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplPositions.
     * @param {FplPositionCreateManyArgs} args - Arguments to create many FplPositions.
     * @example
     * // Create many FplPositions
     * const fplPosition = await prisma.fplPosition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplPositionCreateManyArgs>(args?: SelectSubset<T, FplPositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplPositions and returns the data saved in the database.
     * @param {FplPositionCreateManyAndReturnArgs} args - Arguments to create many FplPositions.
     * @example
     * // Create many FplPositions
     * const fplPosition = await prisma.fplPosition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplPositions and only return the `id`
     * const fplPositionWithIdOnly = await prisma.fplPosition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplPositionCreateManyAndReturnArgs>(args?: SelectSubset<T, FplPositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplPosition.
     * @param {FplPositionDeleteArgs} args - Arguments to delete one FplPosition.
     * @example
     * // Delete one FplPosition
     * const FplPosition = await prisma.fplPosition.delete({
     *   where: {
     *     // ... filter to delete one FplPosition
     *   }
     * })
     * 
     */
    delete<T extends FplPositionDeleteArgs>(args: SelectSubset<T, FplPositionDeleteArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplPosition.
     * @param {FplPositionUpdateArgs} args - Arguments to update one FplPosition.
     * @example
     * // Update one FplPosition
     * const fplPosition = await prisma.fplPosition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplPositionUpdateArgs>(args: SelectSubset<T, FplPositionUpdateArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplPositions.
     * @param {FplPositionDeleteManyArgs} args - Arguments to filter FplPositions to delete.
     * @example
     * // Delete a few FplPositions
     * const { count } = await prisma.fplPosition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplPositionDeleteManyArgs>(args?: SelectSubset<T, FplPositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplPositions
     * const fplPosition = await prisma.fplPosition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplPositionUpdateManyArgs>(args: SelectSubset<T, FplPositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplPositions and returns the data updated in the database.
     * @param {FplPositionUpdateManyAndReturnArgs} args - Arguments to update many FplPositions.
     * @example
     * // Update many FplPositions
     * const fplPosition = await prisma.fplPosition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplPositions and only return the `id`
     * const fplPositionWithIdOnly = await prisma.fplPosition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplPositionUpdateManyAndReturnArgs>(args: SelectSubset<T, FplPositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplPosition.
     * @param {FplPositionUpsertArgs} args - Arguments to update or create a FplPosition.
     * @example
     * // Update or create a FplPosition
     * const fplPosition = await prisma.fplPosition.upsert({
     *   create: {
     *     // ... data to create a FplPosition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplPosition we want to update
     *   }
     * })
     */
    upsert<T extends FplPositionUpsertArgs>(args: SelectSubset<T, FplPositionUpsertArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionCountArgs} args - Arguments to filter FplPositions to count.
     * @example
     * // Count the number of FplPositions
     * const count = await prisma.fplPosition.count({
     *   where: {
     *     // ... the filter for the FplPositions we want to count
     *   }
     * })
    **/
    count<T extends FplPositionCountArgs>(
      args?: Subset<T, FplPositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplPositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplPositionAggregateArgs>(args: Subset<T, FplPositionAggregateArgs>): Prisma.PrismaPromise<GetFplPositionAggregateType<T>>

    /**
     * Group by FplPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplPositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplPositionGroupByArgs['orderBy'] }
        : { orderBy?: FplPositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplPositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplPosition model
   */
  readonly fields: FplPositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplPosition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplPositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends FplPosition$playersArgs<ExtArgs> = {}>(args?: Subset<T, FplPosition$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplPosition model
   */
  interface FplPositionFieldRefs {
    readonly id: FieldRef<"FplPosition", 'Int'>
    readonly shortName: FieldRef<"FplPosition", 'String'>
    readonly updatedAt: FieldRef<"FplPosition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplPosition findUnique
   */
  export type FplPositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * Filter, which FplPosition to fetch.
     */
    where: FplPositionWhereUniqueInput
  }

  /**
   * FplPosition findUniqueOrThrow
   */
  export type FplPositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * Filter, which FplPosition to fetch.
     */
    where: FplPositionWhereUniqueInput
  }

  /**
   * FplPosition findFirst
   */
  export type FplPositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * Filter, which FplPosition to fetch.
     */
    where?: FplPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPositions to fetch.
     */
    orderBy?: FplPositionOrderByWithRelationInput | FplPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplPositions.
     */
    cursor?: FplPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplPositions.
     */
    distinct?: FplPositionScalarFieldEnum | FplPositionScalarFieldEnum[]
  }

  /**
   * FplPosition findFirstOrThrow
   */
  export type FplPositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * Filter, which FplPosition to fetch.
     */
    where?: FplPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPositions to fetch.
     */
    orderBy?: FplPositionOrderByWithRelationInput | FplPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplPositions.
     */
    cursor?: FplPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplPositions.
     */
    distinct?: FplPositionScalarFieldEnum | FplPositionScalarFieldEnum[]
  }

  /**
   * FplPosition findMany
   */
  export type FplPositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * Filter, which FplPositions to fetch.
     */
    where?: FplPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPositions to fetch.
     */
    orderBy?: FplPositionOrderByWithRelationInput | FplPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplPositions.
     */
    cursor?: FplPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPositions.
     */
    skip?: number
    distinct?: FplPositionScalarFieldEnum | FplPositionScalarFieldEnum[]
  }

  /**
   * FplPosition create
   */
  export type FplPositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * The data needed to create a FplPosition.
     */
    data: XOR<FplPositionCreateInput, FplPositionUncheckedCreateInput>
  }

  /**
   * FplPosition createMany
   */
  export type FplPositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplPositions.
     */
    data: FplPositionCreateManyInput | FplPositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplPosition createManyAndReturn
   */
  export type FplPositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * The data used to create many FplPositions.
     */
    data: FplPositionCreateManyInput | FplPositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplPosition update
   */
  export type FplPositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * The data needed to update a FplPosition.
     */
    data: XOR<FplPositionUpdateInput, FplPositionUncheckedUpdateInput>
    /**
     * Choose, which FplPosition to update.
     */
    where: FplPositionWhereUniqueInput
  }

  /**
   * FplPosition updateMany
   */
  export type FplPositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplPositions.
     */
    data: XOR<FplPositionUpdateManyMutationInput, FplPositionUncheckedUpdateManyInput>
    /**
     * Filter which FplPositions to update
     */
    where?: FplPositionWhereInput
    /**
     * Limit how many FplPositions to update.
     */
    limit?: number
  }

  /**
   * FplPosition updateManyAndReturn
   */
  export type FplPositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * The data used to update FplPositions.
     */
    data: XOR<FplPositionUpdateManyMutationInput, FplPositionUncheckedUpdateManyInput>
    /**
     * Filter which FplPositions to update
     */
    where?: FplPositionWhereInput
    /**
     * Limit how many FplPositions to update.
     */
    limit?: number
  }

  /**
   * FplPosition upsert
   */
  export type FplPositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * The filter to search for the FplPosition to update in case it exists.
     */
    where: FplPositionWhereUniqueInput
    /**
     * In case the FplPosition found by the `where` argument doesn't exist, create a new FplPosition with this data.
     */
    create: XOR<FplPositionCreateInput, FplPositionUncheckedCreateInput>
    /**
     * In case the FplPosition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplPositionUpdateInput, FplPositionUncheckedUpdateInput>
  }

  /**
   * FplPosition delete
   */
  export type FplPositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
    /**
     * Filter which FplPosition to delete.
     */
    where: FplPositionWhereUniqueInput
  }

  /**
   * FplPosition deleteMany
   */
  export type FplPositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplPositions to delete
     */
    where?: FplPositionWhereInput
    /**
     * Limit how many FplPositions to delete.
     */
    limit?: number
  }

  /**
   * FplPosition.players
   */
  export type FplPosition$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    where?: FplPlayerWhereInput
    orderBy?: FplPlayerOrderByWithRelationInput | FplPlayerOrderByWithRelationInput[]
    cursor?: FplPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplPlayerScalarFieldEnum | FplPlayerScalarFieldEnum[]
  }

  /**
   * FplPosition without action
   */
  export type FplPositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPosition
     */
    select?: FplPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPosition
     */
    omit?: FplPositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPositionInclude<ExtArgs> | null
  }


  /**
   * Model FplPlayer
   */

  export type AggregateFplPlayer = {
    _count: FplPlayerCountAggregateOutputType | null
    _avg: FplPlayerAvgAggregateOutputType | null
    _sum: FplPlayerSumAggregateOutputType | null
    _min: FplPlayerMinAggregateOutputType | null
    _max: FplPlayerMaxAggregateOutputType | null
  }

  export type FplPlayerAvgAggregateOutputType = {
    id: number | null
    teamId: number | null
    positionId: number | null
    nowCost: number | null
    selectedByPercent: number | null
    transfersInEvent: number | null
    transfersOutEvent: number | null
  }

  export type FplPlayerSumAggregateOutputType = {
    id: number | null
    teamId: number | null
    positionId: number | null
    nowCost: number | null
    selectedByPercent: number | null
    transfersInEvent: number | null
    transfersOutEvent: number | null
  }

  export type FplPlayerMinAggregateOutputType = {
    id: number | null
    teamId: number | null
    positionId: number | null
    firstName: string | null
    secondName: string | null
    webName: string | null
    nowCost: number | null
    status: string | null
    news: string | null
    selectedByPercent: number | null
    transfersInEvent: number | null
    transfersOutEvent: number | null
    updatedAt: Date | null
  }

  export type FplPlayerMaxAggregateOutputType = {
    id: number | null
    teamId: number | null
    positionId: number | null
    firstName: string | null
    secondName: string | null
    webName: string | null
    nowCost: number | null
    status: string | null
    news: string | null
    selectedByPercent: number | null
    transfersInEvent: number | null
    transfersOutEvent: number | null
    updatedAt: Date | null
  }

  export type FplPlayerCountAggregateOutputType = {
    id: number
    teamId: number
    positionId: number
    firstName: number
    secondName: number
    webName: number
    nowCost: number
    status: number
    news: number
    selectedByPercent: number
    transfersInEvent: number
    transfersOutEvent: number
    updatedAt: number
    _all: number
  }


  export type FplPlayerAvgAggregateInputType = {
    id?: true
    teamId?: true
    positionId?: true
    nowCost?: true
    selectedByPercent?: true
    transfersInEvent?: true
    transfersOutEvent?: true
  }

  export type FplPlayerSumAggregateInputType = {
    id?: true
    teamId?: true
    positionId?: true
    nowCost?: true
    selectedByPercent?: true
    transfersInEvent?: true
    transfersOutEvent?: true
  }

  export type FplPlayerMinAggregateInputType = {
    id?: true
    teamId?: true
    positionId?: true
    firstName?: true
    secondName?: true
    webName?: true
    nowCost?: true
    status?: true
    news?: true
    selectedByPercent?: true
    transfersInEvent?: true
    transfersOutEvent?: true
    updatedAt?: true
  }

  export type FplPlayerMaxAggregateInputType = {
    id?: true
    teamId?: true
    positionId?: true
    firstName?: true
    secondName?: true
    webName?: true
    nowCost?: true
    status?: true
    news?: true
    selectedByPercent?: true
    transfersInEvent?: true
    transfersOutEvent?: true
    updatedAt?: true
  }

  export type FplPlayerCountAggregateInputType = {
    id?: true
    teamId?: true
    positionId?: true
    firstName?: true
    secondName?: true
    webName?: true
    nowCost?: true
    status?: true
    news?: true
    selectedByPercent?: true
    transfersInEvent?: true
    transfersOutEvent?: true
    updatedAt?: true
    _all?: true
  }

  export type FplPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplPlayer to aggregate.
     */
    where?: FplPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPlayers to fetch.
     */
    orderBy?: FplPlayerOrderByWithRelationInput | FplPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplPlayers
    **/
    _count?: true | FplPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplPlayerMaxAggregateInputType
  }

  export type GetFplPlayerAggregateType<T extends FplPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateFplPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplPlayer[P]>
      : GetScalarType<T[P], AggregateFplPlayer[P]>
  }




  export type FplPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplPlayerWhereInput
    orderBy?: FplPlayerOrderByWithAggregationInput | FplPlayerOrderByWithAggregationInput[]
    by: FplPlayerScalarFieldEnum[] | FplPlayerScalarFieldEnum
    having?: FplPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplPlayerCountAggregateInputType | true
    _avg?: FplPlayerAvgAggregateInputType
    _sum?: FplPlayerSumAggregateInputType
    _min?: FplPlayerMinAggregateInputType
    _max?: FplPlayerMaxAggregateInputType
  }

  export type FplPlayerGroupByOutputType = {
    id: number
    teamId: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news: string | null
    selectedByPercent: number | null
    transfersInEvent: number
    transfersOutEvent: number
    updatedAt: Date
    _count: FplPlayerCountAggregateOutputType | null
    _avg: FplPlayerAvgAggregateOutputType | null
    _sum: FplPlayerSumAggregateOutputType | null
    _min: FplPlayerMinAggregateOutputType | null
    _max: FplPlayerMaxAggregateOutputType | null
  }

  type GetFplPlayerGroupByPayload<T extends FplPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], FplPlayerGroupByOutputType[P]>
        }
      >
    >


  export type FplPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    positionId?: boolean
    firstName?: boolean
    secondName?: boolean
    webName?: boolean
    nowCost?: boolean
    status?: boolean
    news?: boolean
    selectedByPercent?: boolean
    transfersInEvent?: boolean
    transfersOutEvent?: boolean
    updatedAt?: boolean
    team?: boolean | FplTeamDefaultArgs<ExtArgs>
    position?: boolean | FplPositionDefaultArgs<ExtArgs>
    transfersIn?: boolean | FplPlayer$transfersInArgs<ExtArgs>
    transfersOut?: boolean | FplPlayer$transfersOutArgs<ExtArgs>
    _count?: boolean | FplPlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplPlayer"]>

  export type FplPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    positionId?: boolean
    firstName?: boolean
    secondName?: boolean
    webName?: boolean
    nowCost?: boolean
    status?: boolean
    news?: boolean
    selectedByPercent?: boolean
    transfersInEvent?: boolean
    transfersOutEvent?: boolean
    updatedAt?: boolean
    team?: boolean | FplTeamDefaultArgs<ExtArgs>
    position?: boolean | FplPositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplPlayer"]>

  export type FplPlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    positionId?: boolean
    firstName?: boolean
    secondName?: boolean
    webName?: boolean
    nowCost?: boolean
    status?: boolean
    news?: boolean
    selectedByPercent?: boolean
    transfersInEvent?: boolean
    transfersOutEvent?: boolean
    updatedAt?: boolean
    team?: boolean | FplTeamDefaultArgs<ExtArgs>
    position?: boolean | FplPositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplPlayer"]>

  export type FplPlayerSelectScalar = {
    id?: boolean
    teamId?: boolean
    positionId?: boolean
    firstName?: boolean
    secondName?: boolean
    webName?: boolean
    nowCost?: boolean
    status?: boolean
    news?: boolean
    selectedByPercent?: boolean
    transfersInEvent?: boolean
    transfersOutEvent?: boolean
    updatedAt?: boolean
  }

  export type FplPlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "positionId" | "firstName" | "secondName" | "webName" | "nowCost" | "status" | "news" | "selectedByPercent" | "transfersInEvent" | "transfersOutEvent" | "updatedAt", ExtArgs["result"]["fplPlayer"]>
  export type FplPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | FplTeamDefaultArgs<ExtArgs>
    position?: boolean | FplPositionDefaultArgs<ExtArgs>
    transfersIn?: boolean | FplPlayer$transfersInArgs<ExtArgs>
    transfersOut?: boolean | FplPlayer$transfersOutArgs<ExtArgs>
    _count?: boolean | FplPlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | FplTeamDefaultArgs<ExtArgs>
    position?: boolean | FplPositionDefaultArgs<ExtArgs>
  }
  export type FplPlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | FplTeamDefaultArgs<ExtArgs>
    position?: boolean | FplPositionDefaultArgs<ExtArgs>
  }

  export type $FplPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplPlayer"
    objects: {
      team: Prisma.$FplTeamPayload<ExtArgs>
      position: Prisma.$FplPositionPayload<ExtArgs>
      transfersIn: Prisma.$FplEntryTransferPayload<ExtArgs>[]
      transfersOut: Prisma.$FplEntryTransferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      teamId: number
      positionId: number
      firstName: string
      secondName: string
      webName: string
      nowCost: number
      status: string
      news: string | null
      selectedByPercent: number | null
      transfersInEvent: number
      transfersOutEvent: number
      updatedAt: Date
    }, ExtArgs["result"]["fplPlayer"]>
    composites: {}
  }

  type FplPlayerGetPayload<S extends boolean | null | undefined | FplPlayerDefaultArgs> = $Result.GetResult<Prisma.$FplPlayerPayload, S>

  type FplPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplPlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplPlayerCountAggregateInputType | true
    }

  export interface FplPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplPlayer'], meta: { name: 'FplPlayer' } }
    /**
     * Find zero or one FplPlayer that matches the filter.
     * @param {FplPlayerFindUniqueArgs} args - Arguments to find a FplPlayer
     * @example
     * // Get one FplPlayer
     * const fplPlayer = await prisma.fplPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplPlayerFindUniqueArgs>(args: SelectSubset<T, FplPlayerFindUniqueArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplPlayerFindUniqueOrThrowArgs} args - Arguments to find a FplPlayer
     * @example
     * // Get one FplPlayer
     * const fplPlayer = await prisma.fplPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, FplPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerFindFirstArgs} args - Arguments to find a FplPlayer
     * @example
     * // Get one FplPlayer
     * const fplPlayer = await prisma.fplPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplPlayerFindFirstArgs>(args?: SelectSubset<T, FplPlayerFindFirstArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerFindFirstOrThrowArgs} args - Arguments to find a FplPlayer
     * @example
     * // Get one FplPlayer
     * const fplPlayer = await prisma.fplPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, FplPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplPlayers
     * const fplPlayers = await prisma.fplPlayer.findMany()
     * 
     * // Get first 10 FplPlayers
     * const fplPlayers = await prisma.fplPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplPlayerWithIdOnly = await prisma.fplPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplPlayerFindManyArgs>(args?: SelectSubset<T, FplPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplPlayer.
     * @param {FplPlayerCreateArgs} args - Arguments to create a FplPlayer.
     * @example
     * // Create one FplPlayer
     * const FplPlayer = await prisma.fplPlayer.create({
     *   data: {
     *     // ... data to create a FplPlayer
     *   }
     * })
     * 
     */
    create<T extends FplPlayerCreateArgs>(args: SelectSubset<T, FplPlayerCreateArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplPlayers.
     * @param {FplPlayerCreateManyArgs} args - Arguments to create many FplPlayers.
     * @example
     * // Create many FplPlayers
     * const fplPlayer = await prisma.fplPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplPlayerCreateManyArgs>(args?: SelectSubset<T, FplPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplPlayers and returns the data saved in the database.
     * @param {FplPlayerCreateManyAndReturnArgs} args - Arguments to create many FplPlayers.
     * @example
     * // Create many FplPlayers
     * const fplPlayer = await prisma.fplPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplPlayers and only return the `id`
     * const fplPlayerWithIdOnly = await prisma.fplPlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, FplPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplPlayer.
     * @param {FplPlayerDeleteArgs} args - Arguments to delete one FplPlayer.
     * @example
     * // Delete one FplPlayer
     * const FplPlayer = await prisma.fplPlayer.delete({
     *   where: {
     *     // ... filter to delete one FplPlayer
     *   }
     * })
     * 
     */
    delete<T extends FplPlayerDeleteArgs>(args: SelectSubset<T, FplPlayerDeleteArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplPlayer.
     * @param {FplPlayerUpdateArgs} args - Arguments to update one FplPlayer.
     * @example
     * // Update one FplPlayer
     * const fplPlayer = await prisma.fplPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplPlayerUpdateArgs>(args: SelectSubset<T, FplPlayerUpdateArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplPlayers.
     * @param {FplPlayerDeleteManyArgs} args - Arguments to filter FplPlayers to delete.
     * @example
     * // Delete a few FplPlayers
     * const { count } = await prisma.fplPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplPlayerDeleteManyArgs>(args?: SelectSubset<T, FplPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplPlayers
     * const fplPlayer = await prisma.fplPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplPlayerUpdateManyArgs>(args: SelectSubset<T, FplPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplPlayers and returns the data updated in the database.
     * @param {FplPlayerUpdateManyAndReturnArgs} args - Arguments to update many FplPlayers.
     * @example
     * // Update many FplPlayers
     * const fplPlayer = await prisma.fplPlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplPlayers and only return the `id`
     * const fplPlayerWithIdOnly = await prisma.fplPlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplPlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, FplPlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplPlayer.
     * @param {FplPlayerUpsertArgs} args - Arguments to update or create a FplPlayer.
     * @example
     * // Update or create a FplPlayer
     * const fplPlayer = await prisma.fplPlayer.upsert({
     *   create: {
     *     // ... data to create a FplPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplPlayer we want to update
     *   }
     * })
     */
    upsert<T extends FplPlayerUpsertArgs>(args: SelectSubset<T, FplPlayerUpsertArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerCountArgs} args - Arguments to filter FplPlayers to count.
     * @example
     * // Count the number of FplPlayers
     * const count = await prisma.fplPlayer.count({
     *   where: {
     *     // ... the filter for the FplPlayers we want to count
     *   }
     * })
    **/
    count<T extends FplPlayerCountArgs>(
      args?: Subset<T, FplPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplPlayerAggregateArgs>(args: Subset<T, FplPlayerAggregateArgs>): Prisma.PrismaPromise<GetFplPlayerAggregateType<T>>

    /**
     * Group by FplPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplPlayerGroupByArgs['orderBy'] }
        : { orderBy?: FplPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplPlayer model
   */
  readonly fields: FplPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends FplTeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplTeamDefaultArgs<ExtArgs>>): Prisma__FplTeamClient<$Result.GetResult<Prisma.$FplTeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    position<T extends FplPositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplPositionDefaultArgs<ExtArgs>>): Prisma__FplPositionClient<$Result.GetResult<Prisma.$FplPositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transfersIn<T extends FplPlayer$transfersInArgs<ExtArgs> = {}>(args?: Subset<T, FplPlayer$transfersInArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersOut<T extends FplPlayer$transfersOutArgs<ExtArgs> = {}>(args?: Subset<T, FplPlayer$transfersOutArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplPlayer model
   */
  interface FplPlayerFieldRefs {
    readonly id: FieldRef<"FplPlayer", 'Int'>
    readonly teamId: FieldRef<"FplPlayer", 'Int'>
    readonly positionId: FieldRef<"FplPlayer", 'Int'>
    readonly firstName: FieldRef<"FplPlayer", 'String'>
    readonly secondName: FieldRef<"FplPlayer", 'String'>
    readonly webName: FieldRef<"FplPlayer", 'String'>
    readonly nowCost: FieldRef<"FplPlayer", 'Int'>
    readonly status: FieldRef<"FplPlayer", 'String'>
    readonly news: FieldRef<"FplPlayer", 'String'>
    readonly selectedByPercent: FieldRef<"FplPlayer", 'Float'>
    readonly transfersInEvent: FieldRef<"FplPlayer", 'Int'>
    readonly transfersOutEvent: FieldRef<"FplPlayer", 'Int'>
    readonly updatedAt: FieldRef<"FplPlayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplPlayer findUnique
   */
  export type FplPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * Filter, which FplPlayer to fetch.
     */
    where: FplPlayerWhereUniqueInput
  }

  /**
   * FplPlayer findUniqueOrThrow
   */
  export type FplPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * Filter, which FplPlayer to fetch.
     */
    where: FplPlayerWhereUniqueInput
  }

  /**
   * FplPlayer findFirst
   */
  export type FplPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * Filter, which FplPlayer to fetch.
     */
    where?: FplPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPlayers to fetch.
     */
    orderBy?: FplPlayerOrderByWithRelationInput | FplPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplPlayers.
     */
    cursor?: FplPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplPlayers.
     */
    distinct?: FplPlayerScalarFieldEnum | FplPlayerScalarFieldEnum[]
  }

  /**
   * FplPlayer findFirstOrThrow
   */
  export type FplPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * Filter, which FplPlayer to fetch.
     */
    where?: FplPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPlayers to fetch.
     */
    orderBy?: FplPlayerOrderByWithRelationInput | FplPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplPlayers.
     */
    cursor?: FplPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplPlayers.
     */
    distinct?: FplPlayerScalarFieldEnum | FplPlayerScalarFieldEnum[]
  }

  /**
   * FplPlayer findMany
   */
  export type FplPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * Filter, which FplPlayers to fetch.
     */
    where?: FplPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplPlayers to fetch.
     */
    orderBy?: FplPlayerOrderByWithRelationInput | FplPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplPlayers.
     */
    cursor?: FplPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplPlayers.
     */
    skip?: number
    distinct?: FplPlayerScalarFieldEnum | FplPlayerScalarFieldEnum[]
  }

  /**
   * FplPlayer create
   */
  export type FplPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a FplPlayer.
     */
    data: XOR<FplPlayerCreateInput, FplPlayerUncheckedCreateInput>
  }

  /**
   * FplPlayer createMany
   */
  export type FplPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplPlayers.
     */
    data: FplPlayerCreateManyInput | FplPlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplPlayer createManyAndReturn
   */
  export type FplPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * The data used to create many FplPlayers.
     */
    data: FplPlayerCreateManyInput | FplPlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplPlayer update
   */
  export type FplPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a FplPlayer.
     */
    data: XOR<FplPlayerUpdateInput, FplPlayerUncheckedUpdateInput>
    /**
     * Choose, which FplPlayer to update.
     */
    where: FplPlayerWhereUniqueInput
  }

  /**
   * FplPlayer updateMany
   */
  export type FplPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplPlayers.
     */
    data: XOR<FplPlayerUpdateManyMutationInput, FplPlayerUncheckedUpdateManyInput>
    /**
     * Filter which FplPlayers to update
     */
    where?: FplPlayerWhereInput
    /**
     * Limit how many FplPlayers to update.
     */
    limit?: number
  }

  /**
   * FplPlayer updateManyAndReturn
   */
  export type FplPlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * The data used to update FplPlayers.
     */
    data: XOR<FplPlayerUpdateManyMutationInput, FplPlayerUncheckedUpdateManyInput>
    /**
     * Filter which FplPlayers to update
     */
    where?: FplPlayerWhereInput
    /**
     * Limit how many FplPlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplPlayer upsert
   */
  export type FplPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the FplPlayer to update in case it exists.
     */
    where: FplPlayerWhereUniqueInput
    /**
     * In case the FplPlayer found by the `where` argument doesn't exist, create a new FplPlayer with this data.
     */
    create: XOR<FplPlayerCreateInput, FplPlayerUncheckedCreateInput>
    /**
     * In case the FplPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplPlayerUpdateInput, FplPlayerUncheckedUpdateInput>
  }

  /**
   * FplPlayer delete
   */
  export type FplPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
    /**
     * Filter which FplPlayer to delete.
     */
    where: FplPlayerWhereUniqueInput
  }

  /**
   * FplPlayer deleteMany
   */
  export type FplPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplPlayers to delete
     */
    where?: FplPlayerWhereInput
    /**
     * Limit how many FplPlayers to delete.
     */
    limit?: number
  }

  /**
   * FplPlayer.transfersIn
   */
  export type FplPlayer$transfersInArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    where?: FplEntryTransferWhereInput
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    cursor?: FplEntryTransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplPlayer.transfersOut
   */
  export type FplPlayer$transfersOutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    where?: FplEntryTransferWhereInput
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    cursor?: FplEntryTransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplPlayer without action
   */
  export type FplPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplPlayer
     */
    select?: FplPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplPlayer
     */
    omit?: FplPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplPlayerInclude<ExtArgs> | null
  }


  /**
   * Model FplGameweek
   */

  export type AggregateFplGameweek = {
    _count: FplGameweekCountAggregateOutputType | null
    _avg: FplGameweekAvgAggregateOutputType | null
    _sum: FplGameweekSumAggregateOutputType | null
    _min: FplGameweekMinAggregateOutputType | null
    _max: FplGameweekMaxAggregateOutputType | null
  }

  export type FplGameweekAvgAggregateOutputType = {
    id: number | null
  }

  export type FplGameweekSumAggregateOutputType = {
    id: number | null
  }

  export type FplGameweekMinAggregateOutputType = {
    id: number | null
    name: string | null
    deadlineTime: Date | null
    finished: boolean | null
    isCurrent: boolean | null
    isNext: boolean | null
    updatedAt: Date | null
  }

  export type FplGameweekMaxAggregateOutputType = {
    id: number | null
    name: string | null
    deadlineTime: Date | null
    finished: boolean | null
    isCurrent: boolean | null
    isNext: boolean | null
    updatedAt: Date | null
  }

  export type FplGameweekCountAggregateOutputType = {
    id: number
    name: number
    deadlineTime: number
    finished: number
    isCurrent: number
    isNext: number
    updatedAt: number
    _all: number
  }


  export type FplGameweekAvgAggregateInputType = {
    id?: true
  }

  export type FplGameweekSumAggregateInputType = {
    id?: true
  }

  export type FplGameweekMinAggregateInputType = {
    id?: true
    name?: true
    deadlineTime?: true
    finished?: true
    isCurrent?: true
    isNext?: true
    updatedAt?: true
  }

  export type FplGameweekMaxAggregateInputType = {
    id?: true
    name?: true
    deadlineTime?: true
    finished?: true
    isCurrent?: true
    isNext?: true
    updatedAt?: true
  }

  export type FplGameweekCountAggregateInputType = {
    id?: true
    name?: true
    deadlineTime?: true
    finished?: true
    isCurrent?: true
    isNext?: true
    updatedAt?: true
    _all?: true
  }

  export type FplGameweekAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplGameweek to aggregate.
     */
    where?: FplGameweekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplGameweeks to fetch.
     */
    orderBy?: FplGameweekOrderByWithRelationInput | FplGameweekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplGameweekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplGameweeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplGameweeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplGameweeks
    **/
    _count?: true | FplGameweekCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplGameweekAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplGameweekSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplGameweekMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplGameweekMaxAggregateInputType
  }

  export type GetFplGameweekAggregateType<T extends FplGameweekAggregateArgs> = {
        [P in keyof T & keyof AggregateFplGameweek]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplGameweek[P]>
      : GetScalarType<T[P], AggregateFplGameweek[P]>
  }




  export type FplGameweekGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplGameweekWhereInput
    orderBy?: FplGameweekOrderByWithAggregationInput | FplGameweekOrderByWithAggregationInput[]
    by: FplGameweekScalarFieldEnum[] | FplGameweekScalarFieldEnum
    having?: FplGameweekScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplGameweekCountAggregateInputType | true
    _avg?: FplGameweekAvgAggregateInputType
    _sum?: FplGameweekSumAggregateInputType
    _min?: FplGameweekMinAggregateInputType
    _max?: FplGameweekMaxAggregateInputType
  }

  export type FplGameweekGroupByOutputType = {
    id: number
    name: string
    deadlineTime: Date
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt: Date
    _count: FplGameweekCountAggregateOutputType | null
    _avg: FplGameweekAvgAggregateOutputType | null
    _sum: FplGameweekSumAggregateOutputType | null
    _min: FplGameweekMinAggregateOutputType | null
    _max: FplGameweekMaxAggregateOutputType | null
  }

  type GetFplGameweekGroupByPayload<T extends FplGameweekGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplGameweekGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplGameweekGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplGameweekGroupByOutputType[P]>
            : GetScalarType<T[P], FplGameweekGroupByOutputType[P]>
        }
      >
    >


  export type FplGameweekSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    deadlineTime?: boolean
    finished?: boolean
    isCurrent?: boolean
    isNext?: boolean
    updatedAt?: boolean
    entrySnapshots?: boolean | FplGameweek$entrySnapshotsArgs<ExtArgs>
    entryTransfers?: boolean | FplGameweek$entryTransfersArgs<ExtArgs>
    _count?: boolean | FplGameweekCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplGameweek"]>

  export type FplGameweekSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    deadlineTime?: boolean
    finished?: boolean
    isCurrent?: boolean
    isNext?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplGameweek"]>

  export type FplGameweekSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    deadlineTime?: boolean
    finished?: boolean
    isCurrent?: boolean
    isNext?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplGameweek"]>

  export type FplGameweekSelectScalar = {
    id?: boolean
    name?: boolean
    deadlineTime?: boolean
    finished?: boolean
    isCurrent?: boolean
    isNext?: boolean
    updatedAt?: boolean
  }

  export type FplGameweekOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "deadlineTime" | "finished" | "isCurrent" | "isNext" | "updatedAt", ExtArgs["result"]["fplGameweek"]>
  export type FplGameweekInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entrySnapshots?: boolean | FplGameweek$entrySnapshotsArgs<ExtArgs>
    entryTransfers?: boolean | FplGameweek$entryTransfersArgs<ExtArgs>
    _count?: boolean | FplGameweekCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplGameweekIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FplGameweekIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FplGameweekPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplGameweek"
    objects: {
      entrySnapshots: Prisma.$FplEntrySnapshotPayload<ExtArgs>[]
      entryTransfers: Prisma.$FplEntryTransferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      deadlineTime: Date
      finished: boolean
      isCurrent: boolean
      isNext: boolean
      updatedAt: Date
    }, ExtArgs["result"]["fplGameweek"]>
    composites: {}
  }

  type FplGameweekGetPayload<S extends boolean | null | undefined | FplGameweekDefaultArgs> = $Result.GetResult<Prisma.$FplGameweekPayload, S>

  type FplGameweekCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplGameweekFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplGameweekCountAggregateInputType | true
    }

  export interface FplGameweekDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplGameweek'], meta: { name: 'FplGameweek' } }
    /**
     * Find zero or one FplGameweek that matches the filter.
     * @param {FplGameweekFindUniqueArgs} args - Arguments to find a FplGameweek
     * @example
     * // Get one FplGameweek
     * const fplGameweek = await prisma.fplGameweek.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplGameweekFindUniqueArgs>(args: SelectSubset<T, FplGameweekFindUniqueArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplGameweek that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplGameweekFindUniqueOrThrowArgs} args - Arguments to find a FplGameweek
     * @example
     * // Get one FplGameweek
     * const fplGameweek = await prisma.fplGameweek.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplGameweekFindUniqueOrThrowArgs>(args: SelectSubset<T, FplGameweekFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplGameweek that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekFindFirstArgs} args - Arguments to find a FplGameweek
     * @example
     * // Get one FplGameweek
     * const fplGameweek = await prisma.fplGameweek.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplGameweekFindFirstArgs>(args?: SelectSubset<T, FplGameweekFindFirstArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplGameweek that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekFindFirstOrThrowArgs} args - Arguments to find a FplGameweek
     * @example
     * // Get one FplGameweek
     * const fplGameweek = await prisma.fplGameweek.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplGameweekFindFirstOrThrowArgs>(args?: SelectSubset<T, FplGameweekFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplGameweeks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplGameweeks
     * const fplGameweeks = await prisma.fplGameweek.findMany()
     * 
     * // Get first 10 FplGameweeks
     * const fplGameweeks = await prisma.fplGameweek.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplGameweekWithIdOnly = await prisma.fplGameweek.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplGameweekFindManyArgs>(args?: SelectSubset<T, FplGameweekFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplGameweek.
     * @param {FplGameweekCreateArgs} args - Arguments to create a FplGameweek.
     * @example
     * // Create one FplGameweek
     * const FplGameweek = await prisma.fplGameweek.create({
     *   data: {
     *     // ... data to create a FplGameweek
     *   }
     * })
     * 
     */
    create<T extends FplGameweekCreateArgs>(args: SelectSubset<T, FplGameweekCreateArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplGameweeks.
     * @param {FplGameweekCreateManyArgs} args - Arguments to create many FplGameweeks.
     * @example
     * // Create many FplGameweeks
     * const fplGameweek = await prisma.fplGameweek.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplGameweekCreateManyArgs>(args?: SelectSubset<T, FplGameweekCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplGameweeks and returns the data saved in the database.
     * @param {FplGameweekCreateManyAndReturnArgs} args - Arguments to create many FplGameweeks.
     * @example
     * // Create many FplGameweeks
     * const fplGameweek = await prisma.fplGameweek.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplGameweeks and only return the `id`
     * const fplGameweekWithIdOnly = await prisma.fplGameweek.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplGameweekCreateManyAndReturnArgs>(args?: SelectSubset<T, FplGameweekCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplGameweek.
     * @param {FplGameweekDeleteArgs} args - Arguments to delete one FplGameweek.
     * @example
     * // Delete one FplGameweek
     * const FplGameweek = await prisma.fplGameweek.delete({
     *   where: {
     *     // ... filter to delete one FplGameweek
     *   }
     * })
     * 
     */
    delete<T extends FplGameweekDeleteArgs>(args: SelectSubset<T, FplGameweekDeleteArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplGameweek.
     * @param {FplGameweekUpdateArgs} args - Arguments to update one FplGameweek.
     * @example
     * // Update one FplGameweek
     * const fplGameweek = await prisma.fplGameweek.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplGameweekUpdateArgs>(args: SelectSubset<T, FplGameweekUpdateArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplGameweeks.
     * @param {FplGameweekDeleteManyArgs} args - Arguments to filter FplGameweeks to delete.
     * @example
     * // Delete a few FplGameweeks
     * const { count } = await prisma.fplGameweek.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplGameweekDeleteManyArgs>(args?: SelectSubset<T, FplGameweekDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplGameweeks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplGameweeks
     * const fplGameweek = await prisma.fplGameweek.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplGameweekUpdateManyArgs>(args: SelectSubset<T, FplGameweekUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplGameweeks and returns the data updated in the database.
     * @param {FplGameweekUpdateManyAndReturnArgs} args - Arguments to update many FplGameweeks.
     * @example
     * // Update many FplGameweeks
     * const fplGameweek = await prisma.fplGameweek.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplGameweeks and only return the `id`
     * const fplGameweekWithIdOnly = await prisma.fplGameweek.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplGameweekUpdateManyAndReturnArgs>(args: SelectSubset<T, FplGameweekUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplGameweek.
     * @param {FplGameweekUpsertArgs} args - Arguments to update or create a FplGameweek.
     * @example
     * // Update or create a FplGameweek
     * const fplGameweek = await prisma.fplGameweek.upsert({
     *   create: {
     *     // ... data to create a FplGameweek
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplGameweek we want to update
     *   }
     * })
     */
    upsert<T extends FplGameweekUpsertArgs>(args: SelectSubset<T, FplGameweekUpsertArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplGameweeks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekCountArgs} args - Arguments to filter FplGameweeks to count.
     * @example
     * // Count the number of FplGameweeks
     * const count = await prisma.fplGameweek.count({
     *   where: {
     *     // ... the filter for the FplGameweeks we want to count
     *   }
     * })
    **/
    count<T extends FplGameweekCountArgs>(
      args?: Subset<T, FplGameweekCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplGameweekCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplGameweek.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplGameweekAggregateArgs>(args: Subset<T, FplGameweekAggregateArgs>): Prisma.PrismaPromise<GetFplGameweekAggregateType<T>>

    /**
     * Group by FplGameweek.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplGameweekGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplGameweekGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplGameweekGroupByArgs['orderBy'] }
        : { orderBy?: FplGameweekGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplGameweekGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplGameweekGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplGameweek model
   */
  readonly fields: FplGameweekFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplGameweek.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplGameweekClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entrySnapshots<T extends FplGameweek$entrySnapshotsArgs<ExtArgs> = {}>(args?: Subset<T, FplGameweek$entrySnapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entryTransfers<T extends FplGameweek$entryTransfersArgs<ExtArgs> = {}>(args?: Subset<T, FplGameweek$entryTransfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplGameweek model
   */
  interface FplGameweekFieldRefs {
    readonly id: FieldRef<"FplGameweek", 'Int'>
    readonly name: FieldRef<"FplGameweek", 'String'>
    readonly deadlineTime: FieldRef<"FplGameweek", 'DateTime'>
    readonly finished: FieldRef<"FplGameweek", 'Boolean'>
    readonly isCurrent: FieldRef<"FplGameweek", 'Boolean'>
    readonly isNext: FieldRef<"FplGameweek", 'Boolean'>
    readonly updatedAt: FieldRef<"FplGameweek", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplGameweek findUnique
   */
  export type FplGameweekFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * Filter, which FplGameweek to fetch.
     */
    where: FplGameweekWhereUniqueInput
  }

  /**
   * FplGameweek findUniqueOrThrow
   */
  export type FplGameweekFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * Filter, which FplGameweek to fetch.
     */
    where: FplGameweekWhereUniqueInput
  }

  /**
   * FplGameweek findFirst
   */
  export type FplGameweekFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * Filter, which FplGameweek to fetch.
     */
    where?: FplGameweekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplGameweeks to fetch.
     */
    orderBy?: FplGameweekOrderByWithRelationInput | FplGameweekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplGameweeks.
     */
    cursor?: FplGameweekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplGameweeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplGameweeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplGameweeks.
     */
    distinct?: FplGameweekScalarFieldEnum | FplGameweekScalarFieldEnum[]
  }

  /**
   * FplGameweek findFirstOrThrow
   */
  export type FplGameweekFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * Filter, which FplGameweek to fetch.
     */
    where?: FplGameweekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplGameweeks to fetch.
     */
    orderBy?: FplGameweekOrderByWithRelationInput | FplGameweekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplGameweeks.
     */
    cursor?: FplGameweekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplGameweeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplGameweeks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplGameweeks.
     */
    distinct?: FplGameweekScalarFieldEnum | FplGameweekScalarFieldEnum[]
  }

  /**
   * FplGameweek findMany
   */
  export type FplGameweekFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * Filter, which FplGameweeks to fetch.
     */
    where?: FplGameweekWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplGameweeks to fetch.
     */
    orderBy?: FplGameweekOrderByWithRelationInput | FplGameweekOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplGameweeks.
     */
    cursor?: FplGameweekWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplGameweeks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplGameweeks.
     */
    skip?: number
    distinct?: FplGameweekScalarFieldEnum | FplGameweekScalarFieldEnum[]
  }

  /**
   * FplGameweek create
   */
  export type FplGameweekCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * The data needed to create a FplGameweek.
     */
    data: XOR<FplGameweekCreateInput, FplGameweekUncheckedCreateInput>
  }

  /**
   * FplGameweek createMany
   */
  export type FplGameweekCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplGameweeks.
     */
    data: FplGameweekCreateManyInput | FplGameweekCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplGameweek createManyAndReturn
   */
  export type FplGameweekCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * The data used to create many FplGameweeks.
     */
    data: FplGameweekCreateManyInput | FplGameweekCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplGameweek update
   */
  export type FplGameweekUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * The data needed to update a FplGameweek.
     */
    data: XOR<FplGameweekUpdateInput, FplGameweekUncheckedUpdateInput>
    /**
     * Choose, which FplGameweek to update.
     */
    where: FplGameweekWhereUniqueInput
  }

  /**
   * FplGameweek updateMany
   */
  export type FplGameweekUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplGameweeks.
     */
    data: XOR<FplGameweekUpdateManyMutationInput, FplGameweekUncheckedUpdateManyInput>
    /**
     * Filter which FplGameweeks to update
     */
    where?: FplGameweekWhereInput
    /**
     * Limit how many FplGameweeks to update.
     */
    limit?: number
  }

  /**
   * FplGameweek updateManyAndReturn
   */
  export type FplGameweekUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * The data used to update FplGameweeks.
     */
    data: XOR<FplGameweekUpdateManyMutationInput, FplGameweekUncheckedUpdateManyInput>
    /**
     * Filter which FplGameweeks to update
     */
    where?: FplGameweekWhereInput
    /**
     * Limit how many FplGameweeks to update.
     */
    limit?: number
  }

  /**
   * FplGameweek upsert
   */
  export type FplGameweekUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * The filter to search for the FplGameweek to update in case it exists.
     */
    where: FplGameweekWhereUniqueInput
    /**
     * In case the FplGameweek found by the `where` argument doesn't exist, create a new FplGameweek with this data.
     */
    create: XOR<FplGameweekCreateInput, FplGameweekUncheckedCreateInput>
    /**
     * In case the FplGameweek was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplGameweekUpdateInput, FplGameweekUncheckedUpdateInput>
  }

  /**
   * FplGameweek delete
   */
  export type FplGameweekDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
    /**
     * Filter which FplGameweek to delete.
     */
    where: FplGameweekWhereUniqueInput
  }

  /**
   * FplGameweek deleteMany
   */
  export type FplGameweekDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplGameweeks to delete
     */
    where?: FplGameweekWhereInput
    /**
     * Limit how many FplGameweeks to delete.
     */
    limit?: number
  }

  /**
   * FplGameweek.entrySnapshots
   */
  export type FplGameweek$entrySnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    where?: FplEntrySnapshotWhereInput
    orderBy?: FplEntrySnapshotOrderByWithRelationInput | FplEntrySnapshotOrderByWithRelationInput[]
    cursor?: FplEntrySnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntrySnapshotScalarFieldEnum | FplEntrySnapshotScalarFieldEnum[]
  }

  /**
   * FplGameweek.entryTransfers
   */
  export type FplGameweek$entryTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    where?: FplEntryTransferWhereInput
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    cursor?: FplEntryTransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplGameweek without action
   */
  export type FplGameweekDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplGameweek
     */
    select?: FplGameweekSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplGameweek
     */
    omit?: FplGameweekOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplGameweekInclude<ExtArgs> | null
  }


  /**
   * Model FplLeague
   */

  export type AggregateFplLeague = {
    _count: FplLeagueCountAggregateOutputType | null
    _avg: FplLeagueAvgAggregateOutputType | null
    _sum: FplLeagueSumAggregateOutputType | null
    _min: FplLeagueMinAggregateOutputType | null
    _max: FplLeagueMaxAggregateOutputType | null
  }

  export type FplLeagueAvgAggregateOutputType = {
    id: number | null
  }

  export type FplLeagueSumAggregateOutputType = {
    id: number | null
  }

  export type FplLeagueMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FplLeagueMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FplLeagueCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FplLeagueAvgAggregateInputType = {
    id?: true
  }

  export type FplLeagueSumAggregateInputType = {
    id?: true
  }

  export type FplLeagueMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FplLeagueMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FplLeagueCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FplLeagueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplLeague to aggregate.
     */
    where?: FplLeagueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagues to fetch.
     */
    orderBy?: FplLeagueOrderByWithRelationInput | FplLeagueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplLeagueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplLeagues
    **/
    _count?: true | FplLeagueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplLeagueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplLeagueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplLeagueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplLeagueMaxAggregateInputType
  }

  export type GetFplLeagueAggregateType<T extends FplLeagueAggregateArgs> = {
        [P in keyof T & keyof AggregateFplLeague]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplLeague[P]>
      : GetScalarType<T[P], AggregateFplLeague[P]>
  }




  export type FplLeagueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplLeagueWhereInput
    orderBy?: FplLeagueOrderByWithAggregationInput | FplLeagueOrderByWithAggregationInput[]
    by: FplLeagueScalarFieldEnum[] | FplLeagueScalarFieldEnum
    having?: FplLeagueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplLeagueCountAggregateInputType | true
    _avg?: FplLeagueAvgAggregateInputType
    _sum?: FplLeagueSumAggregateInputType
    _min?: FplLeagueMinAggregateInputType
    _max?: FplLeagueMaxAggregateInputType
  }

  export type FplLeagueGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: FplLeagueCountAggregateOutputType | null
    _avg: FplLeagueAvgAggregateOutputType | null
    _sum: FplLeagueSumAggregateOutputType | null
    _min: FplLeagueMinAggregateOutputType | null
    _max: FplLeagueMaxAggregateOutputType | null
  }

  type GetFplLeagueGroupByPayload<T extends FplLeagueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplLeagueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplLeagueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplLeagueGroupByOutputType[P]>
            : GetScalarType<T[P], FplLeagueGroupByOutputType[P]>
        }
      >
    >


  export type FplLeagueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entries?: boolean | FplLeague$entriesArgs<ExtArgs>
    entrySnapshots?: boolean | FplLeague$entrySnapshotsArgs<ExtArgs>
    _count?: boolean | FplLeagueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplLeague"]>

  export type FplLeagueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplLeague"]>

  export type FplLeagueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fplLeague"]>

  export type FplLeagueSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FplLeagueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["fplLeague"]>
  export type FplLeagueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | FplLeague$entriesArgs<ExtArgs>
    entrySnapshots?: boolean | FplLeague$entrySnapshotsArgs<ExtArgs>
    _count?: boolean | FplLeagueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplLeagueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FplLeagueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FplLeaguePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplLeague"
    objects: {
      entries: Prisma.$FplLeagueEntryPayload<ExtArgs>[]
      entrySnapshots: Prisma.$FplEntrySnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fplLeague"]>
    composites: {}
  }

  type FplLeagueGetPayload<S extends boolean | null | undefined | FplLeagueDefaultArgs> = $Result.GetResult<Prisma.$FplLeaguePayload, S>

  type FplLeagueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplLeagueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplLeagueCountAggregateInputType | true
    }

  export interface FplLeagueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplLeague'], meta: { name: 'FplLeague' } }
    /**
     * Find zero or one FplLeague that matches the filter.
     * @param {FplLeagueFindUniqueArgs} args - Arguments to find a FplLeague
     * @example
     * // Get one FplLeague
     * const fplLeague = await prisma.fplLeague.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplLeagueFindUniqueArgs>(args: SelectSubset<T, FplLeagueFindUniqueArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplLeague that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplLeagueFindUniqueOrThrowArgs} args - Arguments to find a FplLeague
     * @example
     * // Get one FplLeague
     * const fplLeague = await prisma.fplLeague.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplLeagueFindUniqueOrThrowArgs>(args: SelectSubset<T, FplLeagueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplLeague that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueFindFirstArgs} args - Arguments to find a FplLeague
     * @example
     * // Get one FplLeague
     * const fplLeague = await prisma.fplLeague.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplLeagueFindFirstArgs>(args?: SelectSubset<T, FplLeagueFindFirstArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplLeague that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueFindFirstOrThrowArgs} args - Arguments to find a FplLeague
     * @example
     * // Get one FplLeague
     * const fplLeague = await prisma.fplLeague.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplLeagueFindFirstOrThrowArgs>(args?: SelectSubset<T, FplLeagueFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplLeagues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplLeagues
     * const fplLeagues = await prisma.fplLeague.findMany()
     * 
     * // Get first 10 FplLeagues
     * const fplLeagues = await prisma.fplLeague.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplLeagueWithIdOnly = await prisma.fplLeague.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplLeagueFindManyArgs>(args?: SelectSubset<T, FplLeagueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplLeague.
     * @param {FplLeagueCreateArgs} args - Arguments to create a FplLeague.
     * @example
     * // Create one FplLeague
     * const FplLeague = await prisma.fplLeague.create({
     *   data: {
     *     // ... data to create a FplLeague
     *   }
     * })
     * 
     */
    create<T extends FplLeagueCreateArgs>(args: SelectSubset<T, FplLeagueCreateArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplLeagues.
     * @param {FplLeagueCreateManyArgs} args - Arguments to create many FplLeagues.
     * @example
     * // Create many FplLeagues
     * const fplLeague = await prisma.fplLeague.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplLeagueCreateManyArgs>(args?: SelectSubset<T, FplLeagueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplLeagues and returns the data saved in the database.
     * @param {FplLeagueCreateManyAndReturnArgs} args - Arguments to create many FplLeagues.
     * @example
     * // Create many FplLeagues
     * const fplLeague = await prisma.fplLeague.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplLeagues and only return the `id`
     * const fplLeagueWithIdOnly = await prisma.fplLeague.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplLeagueCreateManyAndReturnArgs>(args?: SelectSubset<T, FplLeagueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplLeague.
     * @param {FplLeagueDeleteArgs} args - Arguments to delete one FplLeague.
     * @example
     * // Delete one FplLeague
     * const FplLeague = await prisma.fplLeague.delete({
     *   where: {
     *     // ... filter to delete one FplLeague
     *   }
     * })
     * 
     */
    delete<T extends FplLeagueDeleteArgs>(args: SelectSubset<T, FplLeagueDeleteArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplLeague.
     * @param {FplLeagueUpdateArgs} args - Arguments to update one FplLeague.
     * @example
     * // Update one FplLeague
     * const fplLeague = await prisma.fplLeague.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplLeagueUpdateArgs>(args: SelectSubset<T, FplLeagueUpdateArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplLeagues.
     * @param {FplLeagueDeleteManyArgs} args - Arguments to filter FplLeagues to delete.
     * @example
     * // Delete a few FplLeagues
     * const { count } = await prisma.fplLeague.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplLeagueDeleteManyArgs>(args?: SelectSubset<T, FplLeagueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplLeagues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplLeagues
     * const fplLeague = await prisma.fplLeague.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplLeagueUpdateManyArgs>(args: SelectSubset<T, FplLeagueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplLeagues and returns the data updated in the database.
     * @param {FplLeagueUpdateManyAndReturnArgs} args - Arguments to update many FplLeagues.
     * @example
     * // Update many FplLeagues
     * const fplLeague = await prisma.fplLeague.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplLeagues and only return the `id`
     * const fplLeagueWithIdOnly = await prisma.fplLeague.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplLeagueUpdateManyAndReturnArgs>(args: SelectSubset<T, FplLeagueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplLeague.
     * @param {FplLeagueUpsertArgs} args - Arguments to update or create a FplLeague.
     * @example
     * // Update or create a FplLeague
     * const fplLeague = await prisma.fplLeague.upsert({
     *   create: {
     *     // ... data to create a FplLeague
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplLeague we want to update
     *   }
     * })
     */
    upsert<T extends FplLeagueUpsertArgs>(args: SelectSubset<T, FplLeagueUpsertArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplLeagues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueCountArgs} args - Arguments to filter FplLeagues to count.
     * @example
     * // Count the number of FplLeagues
     * const count = await prisma.fplLeague.count({
     *   where: {
     *     // ... the filter for the FplLeagues we want to count
     *   }
     * })
    **/
    count<T extends FplLeagueCountArgs>(
      args?: Subset<T, FplLeagueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplLeagueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplLeague.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplLeagueAggregateArgs>(args: Subset<T, FplLeagueAggregateArgs>): Prisma.PrismaPromise<GetFplLeagueAggregateType<T>>

    /**
     * Group by FplLeague.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplLeagueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplLeagueGroupByArgs['orderBy'] }
        : { orderBy?: FplLeagueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplLeagueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplLeagueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplLeague model
   */
  readonly fields: FplLeagueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplLeague.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplLeagueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entries<T extends FplLeague$entriesArgs<ExtArgs> = {}>(args?: Subset<T, FplLeague$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entrySnapshots<T extends FplLeague$entrySnapshotsArgs<ExtArgs> = {}>(args?: Subset<T, FplLeague$entrySnapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplLeague model
   */
  interface FplLeagueFieldRefs {
    readonly id: FieldRef<"FplLeague", 'Int'>
    readonly name: FieldRef<"FplLeague", 'String'>
    readonly createdAt: FieldRef<"FplLeague", 'DateTime'>
    readonly updatedAt: FieldRef<"FplLeague", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplLeague findUnique
   */
  export type FplLeagueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * Filter, which FplLeague to fetch.
     */
    where: FplLeagueWhereUniqueInput
  }

  /**
   * FplLeague findUniqueOrThrow
   */
  export type FplLeagueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * Filter, which FplLeague to fetch.
     */
    where: FplLeagueWhereUniqueInput
  }

  /**
   * FplLeague findFirst
   */
  export type FplLeagueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * Filter, which FplLeague to fetch.
     */
    where?: FplLeagueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagues to fetch.
     */
    orderBy?: FplLeagueOrderByWithRelationInput | FplLeagueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplLeagues.
     */
    cursor?: FplLeagueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplLeagues.
     */
    distinct?: FplLeagueScalarFieldEnum | FplLeagueScalarFieldEnum[]
  }

  /**
   * FplLeague findFirstOrThrow
   */
  export type FplLeagueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * Filter, which FplLeague to fetch.
     */
    where?: FplLeagueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagues to fetch.
     */
    orderBy?: FplLeagueOrderByWithRelationInput | FplLeagueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplLeagues.
     */
    cursor?: FplLeagueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplLeagues.
     */
    distinct?: FplLeagueScalarFieldEnum | FplLeagueScalarFieldEnum[]
  }

  /**
   * FplLeague findMany
   */
  export type FplLeagueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * Filter, which FplLeagues to fetch.
     */
    where?: FplLeagueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagues to fetch.
     */
    orderBy?: FplLeagueOrderByWithRelationInput | FplLeagueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplLeagues.
     */
    cursor?: FplLeagueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagues.
     */
    skip?: number
    distinct?: FplLeagueScalarFieldEnum | FplLeagueScalarFieldEnum[]
  }

  /**
   * FplLeague create
   */
  export type FplLeagueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * The data needed to create a FplLeague.
     */
    data: XOR<FplLeagueCreateInput, FplLeagueUncheckedCreateInput>
  }

  /**
   * FplLeague createMany
   */
  export type FplLeagueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplLeagues.
     */
    data: FplLeagueCreateManyInput | FplLeagueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplLeague createManyAndReturn
   */
  export type FplLeagueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * The data used to create many FplLeagues.
     */
    data: FplLeagueCreateManyInput | FplLeagueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplLeague update
   */
  export type FplLeagueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * The data needed to update a FplLeague.
     */
    data: XOR<FplLeagueUpdateInput, FplLeagueUncheckedUpdateInput>
    /**
     * Choose, which FplLeague to update.
     */
    where: FplLeagueWhereUniqueInput
  }

  /**
   * FplLeague updateMany
   */
  export type FplLeagueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplLeagues.
     */
    data: XOR<FplLeagueUpdateManyMutationInput, FplLeagueUncheckedUpdateManyInput>
    /**
     * Filter which FplLeagues to update
     */
    where?: FplLeagueWhereInput
    /**
     * Limit how many FplLeagues to update.
     */
    limit?: number
  }

  /**
   * FplLeague updateManyAndReturn
   */
  export type FplLeagueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * The data used to update FplLeagues.
     */
    data: XOR<FplLeagueUpdateManyMutationInput, FplLeagueUncheckedUpdateManyInput>
    /**
     * Filter which FplLeagues to update
     */
    where?: FplLeagueWhereInput
    /**
     * Limit how many FplLeagues to update.
     */
    limit?: number
  }

  /**
   * FplLeague upsert
   */
  export type FplLeagueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * The filter to search for the FplLeague to update in case it exists.
     */
    where: FplLeagueWhereUniqueInput
    /**
     * In case the FplLeague found by the `where` argument doesn't exist, create a new FplLeague with this data.
     */
    create: XOR<FplLeagueCreateInput, FplLeagueUncheckedCreateInput>
    /**
     * In case the FplLeague was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplLeagueUpdateInput, FplLeagueUncheckedUpdateInput>
  }

  /**
   * FplLeague delete
   */
  export type FplLeagueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
    /**
     * Filter which FplLeague to delete.
     */
    where: FplLeagueWhereUniqueInput
  }

  /**
   * FplLeague deleteMany
   */
  export type FplLeagueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplLeagues to delete
     */
    where?: FplLeagueWhereInput
    /**
     * Limit how many FplLeagues to delete.
     */
    limit?: number
  }

  /**
   * FplLeague.entries
   */
  export type FplLeague$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    where?: FplLeagueEntryWhereInput
    orderBy?: FplLeagueEntryOrderByWithRelationInput | FplLeagueEntryOrderByWithRelationInput[]
    cursor?: FplLeagueEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplLeagueEntryScalarFieldEnum | FplLeagueEntryScalarFieldEnum[]
  }

  /**
   * FplLeague.entrySnapshots
   */
  export type FplLeague$entrySnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    where?: FplEntrySnapshotWhereInput
    orderBy?: FplEntrySnapshotOrderByWithRelationInput | FplEntrySnapshotOrderByWithRelationInput[]
    cursor?: FplEntrySnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntrySnapshotScalarFieldEnum | FplEntrySnapshotScalarFieldEnum[]
  }

  /**
   * FplLeague without action
   */
  export type FplLeagueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeague
     */
    select?: FplLeagueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeague
     */
    omit?: FplLeagueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueInclude<ExtArgs> | null
  }


  /**
   * Model FplLeagueEntry
   */

  export type AggregateFplLeagueEntry = {
    _count: FplLeagueEntryCountAggregateOutputType | null
    _avg: FplLeagueEntryAvgAggregateOutputType | null
    _sum: FplLeagueEntrySumAggregateOutputType | null
    _min: FplLeagueEntryMinAggregateOutputType | null
    _max: FplLeagueEntryMaxAggregateOutputType | null
  }

  export type FplLeagueEntryAvgAggregateOutputType = {
    id: number | null
    leagueId: number | null
    rank: number | null
    lastRank: number | null
    totalPoints: number | null
  }

  export type FplLeagueEntrySumAggregateOutputType = {
    id: number | null
    leagueId: number | null
    rank: number | null
    lastRank: number | null
    totalPoints: number | null
  }

  export type FplLeagueEntryMinAggregateOutputType = {
    id: number | null
    leagueId: number | null
    entryName: string | null
    playerName: string | null
    rank: number | null
    lastRank: number | null
    totalPoints: number | null
    updatedAt: Date | null
  }

  export type FplLeagueEntryMaxAggregateOutputType = {
    id: number | null
    leagueId: number | null
    entryName: string | null
    playerName: string | null
    rank: number | null
    lastRank: number | null
    totalPoints: number | null
    updatedAt: Date | null
  }

  export type FplLeagueEntryCountAggregateOutputType = {
    id: number
    leagueId: number
    entryName: number
    playerName: number
    rank: number
    lastRank: number
    totalPoints: number
    updatedAt: number
    _all: number
  }


  export type FplLeagueEntryAvgAggregateInputType = {
    id?: true
    leagueId?: true
    rank?: true
    lastRank?: true
    totalPoints?: true
  }

  export type FplLeagueEntrySumAggregateInputType = {
    id?: true
    leagueId?: true
    rank?: true
    lastRank?: true
    totalPoints?: true
  }

  export type FplLeagueEntryMinAggregateInputType = {
    id?: true
    leagueId?: true
    entryName?: true
    playerName?: true
    rank?: true
    lastRank?: true
    totalPoints?: true
    updatedAt?: true
  }

  export type FplLeagueEntryMaxAggregateInputType = {
    id?: true
    leagueId?: true
    entryName?: true
    playerName?: true
    rank?: true
    lastRank?: true
    totalPoints?: true
    updatedAt?: true
  }

  export type FplLeagueEntryCountAggregateInputType = {
    id?: true
    leagueId?: true
    entryName?: true
    playerName?: true
    rank?: true
    lastRank?: true
    totalPoints?: true
    updatedAt?: true
    _all?: true
  }

  export type FplLeagueEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplLeagueEntry to aggregate.
     */
    where?: FplLeagueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagueEntries to fetch.
     */
    orderBy?: FplLeagueEntryOrderByWithRelationInput | FplLeagueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplLeagueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplLeagueEntries
    **/
    _count?: true | FplLeagueEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplLeagueEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplLeagueEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplLeagueEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplLeagueEntryMaxAggregateInputType
  }

  export type GetFplLeagueEntryAggregateType<T extends FplLeagueEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateFplLeagueEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplLeagueEntry[P]>
      : GetScalarType<T[P], AggregateFplLeagueEntry[P]>
  }




  export type FplLeagueEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplLeagueEntryWhereInput
    orderBy?: FplLeagueEntryOrderByWithAggregationInput | FplLeagueEntryOrderByWithAggregationInput[]
    by: FplLeagueEntryScalarFieldEnum[] | FplLeagueEntryScalarFieldEnum
    having?: FplLeagueEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplLeagueEntryCountAggregateInputType | true
    _avg?: FplLeagueEntryAvgAggregateInputType
    _sum?: FplLeagueEntrySumAggregateInputType
    _min?: FplLeagueEntryMinAggregateInputType
    _max?: FplLeagueEntryMaxAggregateInputType
  }

  export type FplLeagueEntryGroupByOutputType = {
    id: number
    leagueId: number
    entryName: string
    playerName: string
    rank: number
    lastRank: number | null
    totalPoints: number
    updatedAt: Date
    _count: FplLeagueEntryCountAggregateOutputType | null
    _avg: FplLeagueEntryAvgAggregateOutputType | null
    _sum: FplLeagueEntrySumAggregateOutputType | null
    _min: FplLeagueEntryMinAggregateOutputType | null
    _max: FplLeagueEntryMaxAggregateOutputType | null
  }

  type GetFplLeagueEntryGroupByPayload<T extends FplLeagueEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplLeagueEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplLeagueEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplLeagueEntryGroupByOutputType[P]>
            : GetScalarType<T[P], FplLeagueEntryGroupByOutputType[P]>
        }
      >
    >


  export type FplLeagueEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leagueId?: boolean
    entryName?: boolean
    playerName?: boolean
    rank?: boolean
    lastRank?: boolean
    totalPoints?: boolean
    updatedAt?: boolean
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    transfers?: boolean | FplLeagueEntry$transfersArgs<ExtArgs>
    behaviourProfile?: boolean | FplLeagueEntry$behaviourProfileArgs<ExtArgs>
    _count?: boolean | FplLeagueEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplLeagueEntry"]>

  export type FplLeagueEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leagueId?: boolean
    entryName?: boolean
    playerName?: boolean
    rank?: boolean
    lastRank?: boolean
    totalPoints?: boolean
    updatedAt?: boolean
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplLeagueEntry"]>

  export type FplLeagueEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leagueId?: boolean
    entryName?: boolean
    playerName?: boolean
    rank?: boolean
    lastRank?: boolean
    totalPoints?: boolean
    updatedAt?: boolean
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplLeagueEntry"]>

  export type FplLeagueEntrySelectScalar = {
    id?: boolean
    leagueId?: boolean
    entryName?: boolean
    playerName?: boolean
    rank?: boolean
    lastRank?: boolean
    totalPoints?: boolean
    updatedAt?: boolean
  }

  export type FplLeagueEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leagueId" | "entryName" | "playerName" | "rank" | "lastRank" | "totalPoints" | "updatedAt", ExtArgs["result"]["fplLeagueEntry"]>
  export type FplLeagueEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    transfers?: boolean | FplLeagueEntry$transfersArgs<ExtArgs>
    behaviourProfile?: boolean | FplLeagueEntry$behaviourProfileArgs<ExtArgs>
    _count?: boolean | FplLeagueEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplLeagueEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
  }
  export type FplLeagueEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
  }

  export type $FplLeagueEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplLeagueEntry"
    objects: {
      league: Prisma.$FplLeaguePayload<ExtArgs>
      transfers: Prisma.$FplEntryTransferPayload<ExtArgs>[]
      behaviourProfile: Prisma.$FplEntryBehaviourProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      leagueId: number
      entryName: string
      playerName: string
      rank: number
      lastRank: number | null
      totalPoints: number
      updatedAt: Date
    }, ExtArgs["result"]["fplLeagueEntry"]>
    composites: {}
  }

  type FplLeagueEntryGetPayload<S extends boolean | null | undefined | FplLeagueEntryDefaultArgs> = $Result.GetResult<Prisma.$FplLeagueEntryPayload, S>

  type FplLeagueEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplLeagueEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplLeagueEntryCountAggregateInputType | true
    }

  export interface FplLeagueEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplLeagueEntry'], meta: { name: 'FplLeagueEntry' } }
    /**
     * Find zero or one FplLeagueEntry that matches the filter.
     * @param {FplLeagueEntryFindUniqueArgs} args - Arguments to find a FplLeagueEntry
     * @example
     * // Get one FplLeagueEntry
     * const fplLeagueEntry = await prisma.fplLeagueEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplLeagueEntryFindUniqueArgs>(args: SelectSubset<T, FplLeagueEntryFindUniqueArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplLeagueEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplLeagueEntryFindUniqueOrThrowArgs} args - Arguments to find a FplLeagueEntry
     * @example
     * // Get one FplLeagueEntry
     * const fplLeagueEntry = await prisma.fplLeagueEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplLeagueEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, FplLeagueEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplLeagueEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryFindFirstArgs} args - Arguments to find a FplLeagueEntry
     * @example
     * // Get one FplLeagueEntry
     * const fplLeagueEntry = await prisma.fplLeagueEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplLeagueEntryFindFirstArgs>(args?: SelectSubset<T, FplLeagueEntryFindFirstArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplLeagueEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryFindFirstOrThrowArgs} args - Arguments to find a FplLeagueEntry
     * @example
     * // Get one FplLeagueEntry
     * const fplLeagueEntry = await prisma.fplLeagueEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplLeagueEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, FplLeagueEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplLeagueEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplLeagueEntries
     * const fplLeagueEntries = await prisma.fplLeagueEntry.findMany()
     * 
     * // Get first 10 FplLeagueEntries
     * const fplLeagueEntries = await prisma.fplLeagueEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplLeagueEntryWithIdOnly = await prisma.fplLeagueEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplLeagueEntryFindManyArgs>(args?: SelectSubset<T, FplLeagueEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplLeagueEntry.
     * @param {FplLeagueEntryCreateArgs} args - Arguments to create a FplLeagueEntry.
     * @example
     * // Create one FplLeagueEntry
     * const FplLeagueEntry = await prisma.fplLeagueEntry.create({
     *   data: {
     *     // ... data to create a FplLeagueEntry
     *   }
     * })
     * 
     */
    create<T extends FplLeagueEntryCreateArgs>(args: SelectSubset<T, FplLeagueEntryCreateArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplLeagueEntries.
     * @param {FplLeagueEntryCreateManyArgs} args - Arguments to create many FplLeagueEntries.
     * @example
     * // Create many FplLeagueEntries
     * const fplLeagueEntry = await prisma.fplLeagueEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplLeagueEntryCreateManyArgs>(args?: SelectSubset<T, FplLeagueEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplLeagueEntries and returns the data saved in the database.
     * @param {FplLeagueEntryCreateManyAndReturnArgs} args - Arguments to create many FplLeagueEntries.
     * @example
     * // Create many FplLeagueEntries
     * const fplLeagueEntry = await prisma.fplLeagueEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplLeagueEntries and only return the `id`
     * const fplLeagueEntryWithIdOnly = await prisma.fplLeagueEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplLeagueEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, FplLeagueEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplLeagueEntry.
     * @param {FplLeagueEntryDeleteArgs} args - Arguments to delete one FplLeagueEntry.
     * @example
     * // Delete one FplLeagueEntry
     * const FplLeagueEntry = await prisma.fplLeagueEntry.delete({
     *   where: {
     *     // ... filter to delete one FplLeagueEntry
     *   }
     * })
     * 
     */
    delete<T extends FplLeagueEntryDeleteArgs>(args: SelectSubset<T, FplLeagueEntryDeleteArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplLeagueEntry.
     * @param {FplLeagueEntryUpdateArgs} args - Arguments to update one FplLeagueEntry.
     * @example
     * // Update one FplLeagueEntry
     * const fplLeagueEntry = await prisma.fplLeagueEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplLeagueEntryUpdateArgs>(args: SelectSubset<T, FplLeagueEntryUpdateArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplLeagueEntries.
     * @param {FplLeagueEntryDeleteManyArgs} args - Arguments to filter FplLeagueEntries to delete.
     * @example
     * // Delete a few FplLeagueEntries
     * const { count } = await prisma.fplLeagueEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplLeagueEntryDeleteManyArgs>(args?: SelectSubset<T, FplLeagueEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplLeagueEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplLeagueEntries
     * const fplLeagueEntry = await prisma.fplLeagueEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplLeagueEntryUpdateManyArgs>(args: SelectSubset<T, FplLeagueEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplLeagueEntries and returns the data updated in the database.
     * @param {FplLeagueEntryUpdateManyAndReturnArgs} args - Arguments to update many FplLeagueEntries.
     * @example
     * // Update many FplLeagueEntries
     * const fplLeagueEntry = await prisma.fplLeagueEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplLeagueEntries and only return the `id`
     * const fplLeagueEntryWithIdOnly = await prisma.fplLeagueEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplLeagueEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, FplLeagueEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplLeagueEntry.
     * @param {FplLeagueEntryUpsertArgs} args - Arguments to update or create a FplLeagueEntry.
     * @example
     * // Update or create a FplLeagueEntry
     * const fplLeagueEntry = await prisma.fplLeagueEntry.upsert({
     *   create: {
     *     // ... data to create a FplLeagueEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplLeagueEntry we want to update
     *   }
     * })
     */
    upsert<T extends FplLeagueEntryUpsertArgs>(args: SelectSubset<T, FplLeagueEntryUpsertArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplLeagueEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryCountArgs} args - Arguments to filter FplLeagueEntries to count.
     * @example
     * // Count the number of FplLeagueEntries
     * const count = await prisma.fplLeagueEntry.count({
     *   where: {
     *     // ... the filter for the FplLeagueEntries we want to count
     *   }
     * })
    **/
    count<T extends FplLeagueEntryCountArgs>(
      args?: Subset<T, FplLeagueEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplLeagueEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplLeagueEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplLeagueEntryAggregateArgs>(args: Subset<T, FplLeagueEntryAggregateArgs>): Prisma.PrismaPromise<GetFplLeagueEntryAggregateType<T>>

    /**
     * Group by FplLeagueEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplLeagueEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplLeagueEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplLeagueEntryGroupByArgs['orderBy'] }
        : { orderBy?: FplLeagueEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplLeagueEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplLeagueEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplLeagueEntry model
   */
  readonly fields: FplLeagueEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplLeagueEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplLeagueEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    league<T extends FplLeagueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplLeagueDefaultArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transfers<T extends FplLeagueEntry$transfersArgs<ExtArgs> = {}>(args?: Subset<T, FplLeagueEntry$transfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    behaviourProfile<T extends FplLeagueEntry$behaviourProfileArgs<ExtArgs> = {}>(args?: Subset<T, FplLeagueEntry$behaviourProfileArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplLeagueEntry model
   */
  interface FplLeagueEntryFieldRefs {
    readonly id: FieldRef<"FplLeagueEntry", 'Int'>
    readonly leagueId: FieldRef<"FplLeagueEntry", 'Int'>
    readonly entryName: FieldRef<"FplLeagueEntry", 'String'>
    readonly playerName: FieldRef<"FplLeagueEntry", 'String'>
    readonly rank: FieldRef<"FplLeagueEntry", 'Int'>
    readonly lastRank: FieldRef<"FplLeagueEntry", 'Int'>
    readonly totalPoints: FieldRef<"FplLeagueEntry", 'Int'>
    readonly updatedAt: FieldRef<"FplLeagueEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplLeagueEntry findUnique
   */
  export type FplLeagueEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * Filter, which FplLeagueEntry to fetch.
     */
    where: FplLeagueEntryWhereUniqueInput
  }

  /**
   * FplLeagueEntry findUniqueOrThrow
   */
  export type FplLeagueEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * Filter, which FplLeagueEntry to fetch.
     */
    where: FplLeagueEntryWhereUniqueInput
  }

  /**
   * FplLeagueEntry findFirst
   */
  export type FplLeagueEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * Filter, which FplLeagueEntry to fetch.
     */
    where?: FplLeagueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagueEntries to fetch.
     */
    orderBy?: FplLeagueEntryOrderByWithRelationInput | FplLeagueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplLeagueEntries.
     */
    cursor?: FplLeagueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplLeagueEntries.
     */
    distinct?: FplLeagueEntryScalarFieldEnum | FplLeagueEntryScalarFieldEnum[]
  }

  /**
   * FplLeagueEntry findFirstOrThrow
   */
  export type FplLeagueEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * Filter, which FplLeagueEntry to fetch.
     */
    where?: FplLeagueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagueEntries to fetch.
     */
    orderBy?: FplLeagueEntryOrderByWithRelationInput | FplLeagueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplLeagueEntries.
     */
    cursor?: FplLeagueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplLeagueEntries.
     */
    distinct?: FplLeagueEntryScalarFieldEnum | FplLeagueEntryScalarFieldEnum[]
  }

  /**
   * FplLeagueEntry findMany
   */
  export type FplLeagueEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * Filter, which FplLeagueEntries to fetch.
     */
    where?: FplLeagueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplLeagueEntries to fetch.
     */
    orderBy?: FplLeagueEntryOrderByWithRelationInput | FplLeagueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplLeagueEntries.
     */
    cursor?: FplLeagueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplLeagueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplLeagueEntries.
     */
    skip?: number
    distinct?: FplLeagueEntryScalarFieldEnum | FplLeagueEntryScalarFieldEnum[]
  }

  /**
   * FplLeagueEntry create
   */
  export type FplLeagueEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a FplLeagueEntry.
     */
    data: XOR<FplLeagueEntryCreateInput, FplLeagueEntryUncheckedCreateInput>
  }

  /**
   * FplLeagueEntry createMany
   */
  export type FplLeagueEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplLeagueEntries.
     */
    data: FplLeagueEntryCreateManyInput | FplLeagueEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplLeagueEntry createManyAndReturn
   */
  export type FplLeagueEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * The data used to create many FplLeagueEntries.
     */
    data: FplLeagueEntryCreateManyInput | FplLeagueEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplLeagueEntry update
   */
  export type FplLeagueEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a FplLeagueEntry.
     */
    data: XOR<FplLeagueEntryUpdateInput, FplLeagueEntryUncheckedUpdateInput>
    /**
     * Choose, which FplLeagueEntry to update.
     */
    where: FplLeagueEntryWhereUniqueInput
  }

  /**
   * FplLeagueEntry updateMany
   */
  export type FplLeagueEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplLeagueEntries.
     */
    data: XOR<FplLeagueEntryUpdateManyMutationInput, FplLeagueEntryUncheckedUpdateManyInput>
    /**
     * Filter which FplLeagueEntries to update
     */
    where?: FplLeagueEntryWhereInput
    /**
     * Limit how many FplLeagueEntries to update.
     */
    limit?: number
  }

  /**
   * FplLeagueEntry updateManyAndReturn
   */
  export type FplLeagueEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * The data used to update FplLeagueEntries.
     */
    data: XOR<FplLeagueEntryUpdateManyMutationInput, FplLeagueEntryUncheckedUpdateManyInput>
    /**
     * Filter which FplLeagueEntries to update
     */
    where?: FplLeagueEntryWhereInput
    /**
     * Limit how many FplLeagueEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplLeagueEntry upsert
   */
  export type FplLeagueEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the FplLeagueEntry to update in case it exists.
     */
    where: FplLeagueEntryWhereUniqueInput
    /**
     * In case the FplLeagueEntry found by the `where` argument doesn't exist, create a new FplLeagueEntry with this data.
     */
    create: XOR<FplLeagueEntryCreateInput, FplLeagueEntryUncheckedCreateInput>
    /**
     * In case the FplLeagueEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplLeagueEntryUpdateInput, FplLeagueEntryUncheckedUpdateInput>
  }

  /**
   * FplLeagueEntry delete
   */
  export type FplLeagueEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
    /**
     * Filter which FplLeagueEntry to delete.
     */
    where: FplLeagueEntryWhereUniqueInput
  }

  /**
   * FplLeagueEntry deleteMany
   */
  export type FplLeagueEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplLeagueEntries to delete
     */
    where?: FplLeagueEntryWhereInput
    /**
     * Limit how many FplLeagueEntries to delete.
     */
    limit?: number
  }

  /**
   * FplLeagueEntry.transfers
   */
  export type FplLeagueEntry$transfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    where?: FplEntryTransferWhereInput
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    cursor?: FplEntryTransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplLeagueEntry.behaviourProfile
   */
  export type FplLeagueEntry$behaviourProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    where?: FplEntryBehaviourProfileWhereInput
  }

  /**
   * FplLeagueEntry without action
   */
  export type FplLeagueEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplLeagueEntry
     */
    select?: FplLeagueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplLeagueEntry
     */
    omit?: FplLeagueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplLeagueEntryInclude<ExtArgs> | null
  }


  /**
   * Model FplEntrySnapshot
   */

  export type AggregateFplEntrySnapshot = {
    _count: FplEntrySnapshotCountAggregateOutputType | null
    _avg: FplEntrySnapshotAvgAggregateOutputType | null
    _sum: FplEntrySnapshotSumAggregateOutputType | null
    _min: FplEntrySnapshotMinAggregateOutputType | null
    _max: FplEntrySnapshotMaxAggregateOutputType | null
  }

  export type FplEntrySnapshotAvgAggregateOutputType = {
    leagueId: number | null
    entryId: number | null
    eventId: number | null
    bank: number | null
    teamValue: number | null
    eventTransfers: number | null
    eventTransfersCost: number | null
  }

  export type FplEntrySnapshotSumAggregateOutputType = {
    leagueId: number | null
    entryId: number | null
    eventId: number | null
    bank: number | null
    teamValue: number | null
    eventTransfers: number | null
    eventTransfersCost: number | null
  }

  export type FplEntrySnapshotMinAggregateOutputType = {
    id: string | null
    leagueId: number | null
    entryId: number | null
    eventId: number | null
    bank: number | null
    teamValue: number | null
    eventTransfers: number | null
    eventTransfersCost: number | null
    fetchedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FplEntrySnapshotMaxAggregateOutputType = {
    id: string | null
    leagueId: number | null
    entryId: number | null
    eventId: number | null
    bank: number | null
    teamValue: number | null
    eventTransfers: number | null
    eventTransfersCost: number | null
    fetchedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FplEntrySnapshotCountAggregateOutputType = {
    id: number
    leagueId: number
    entryId: number
    eventId: number
    bank: number
    teamValue: number
    eventTransfers: number
    eventTransfersCost: number
    fetchedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FplEntrySnapshotAvgAggregateInputType = {
    leagueId?: true
    entryId?: true
    eventId?: true
    bank?: true
    teamValue?: true
    eventTransfers?: true
    eventTransfersCost?: true
  }

  export type FplEntrySnapshotSumAggregateInputType = {
    leagueId?: true
    entryId?: true
    eventId?: true
    bank?: true
    teamValue?: true
    eventTransfers?: true
    eventTransfersCost?: true
  }

  export type FplEntrySnapshotMinAggregateInputType = {
    id?: true
    leagueId?: true
    entryId?: true
    eventId?: true
    bank?: true
    teamValue?: true
    eventTransfers?: true
    eventTransfersCost?: true
    fetchedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FplEntrySnapshotMaxAggregateInputType = {
    id?: true
    leagueId?: true
    entryId?: true
    eventId?: true
    bank?: true
    teamValue?: true
    eventTransfers?: true
    eventTransfersCost?: true
    fetchedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FplEntrySnapshotCountAggregateInputType = {
    id?: true
    leagueId?: true
    entryId?: true
    eventId?: true
    bank?: true
    teamValue?: true
    eventTransfers?: true
    eventTransfersCost?: true
    fetchedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FplEntrySnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntrySnapshot to aggregate.
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntrySnapshots to fetch.
     */
    orderBy?: FplEntrySnapshotOrderByWithRelationInput | FplEntrySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplEntrySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntrySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntrySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplEntrySnapshots
    **/
    _count?: true | FplEntrySnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplEntrySnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplEntrySnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplEntrySnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplEntrySnapshotMaxAggregateInputType
  }

  export type GetFplEntrySnapshotAggregateType<T extends FplEntrySnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateFplEntrySnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplEntrySnapshot[P]>
      : GetScalarType<T[P], AggregateFplEntrySnapshot[P]>
  }




  export type FplEntrySnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntrySnapshotWhereInput
    orderBy?: FplEntrySnapshotOrderByWithAggregationInput | FplEntrySnapshotOrderByWithAggregationInput[]
    by: FplEntrySnapshotScalarFieldEnum[] | FplEntrySnapshotScalarFieldEnum
    having?: FplEntrySnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplEntrySnapshotCountAggregateInputType | true
    _avg?: FplEntrySnapshotAvgAggregateInputType
    _sum?: FplEntrySnapshotSumAggregateInputType
    _min?: FplEntrySnapshotMinAggregateInputType
    _max?: FplEntrySnapshotMaxAggregateInputType
  }

  export type FplEntrySnapshotGroupByOutputType = {
    id: string
    leagueId: number
    entryId: number
    eventId: number
    bank: number | null
    teamValue: number | null
    eventTransfers: number | null
    eventTransfersCost: number | null
    fetchedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: FplEntrySnapshotCountAggregateOutputType | null
    _avg: FplEntrySnapshotAvgAggregateOutputType | null
    _sum: FplEntrySnapshotSumAggregateOutputType | null
    _min: FplEntrySnapshotMinAggregateOutputType | null
    _max: FplEntrySnapshotMaxAggregateOutputType | null
  }

  type GetFplEntrySnapshotGroupByPayload<T extends FplEntrySnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplEntrySnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplEntrySnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplEntrySnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], FplEntrySnapshotGroupByOutputType[P]>
        }
      >
    >


  export type FplEntrySnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leagueId?: boolean
    entryId?: boolean
    eventId?: boolean
    bank?: boolean
    teamValue?: boolean
    eventTransfers?: boolean
    eventTransfersCost?: boolean
    fetchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    picks?: boolean | FplEntrySnapshot$picksArgs<ExtArgs>
    _count?: boolean | FplEntrySnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntrySnapshot"]>

  export type FplEntrySnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leagueId?: boolean
    entryId?: boolean
    eventId?: boolean
    bank?: boolean
    teamValue?: boolean
    eventTransfers?: boolean
    eventTransfersCost?: boolean
    fetchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntrySnapshot"]>

  export type FplEntrySnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leagueId?: boolean
    entryId?: boolean
    eventId?: boolean
    bank?: boolean
    teamValue?: boolean
    eventTransfers?: boolean
    eventTransfersCost?: boolean
    fetchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntrySnapshot"]>

  export type FplEntrySnapshotSelectScalar = {
    id?: boolean
    leagueId?: boolean
    entryId?: boolean
    eventId?: boolean
    bank?: boolean
    teamValue?: boolean
    eventTransfers?: boolean
    eventTransfersCost?: boolean
    fetchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FplEntrySnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leagueId" | "entryId" | "eventId" | "bank" | "teamValue" | "eventTransfers" | "eventTransfersCost" | "fetchedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["fplEntrySnapshot"]>
  export type FplEntrySnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    picks?: boolean | FplEntrySnapshot$picksArgs<ExtArgs>
    _count?: boolean | FplEntrySnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FplEntrySnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
  }
  export type FplEntrySnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    league?: boolean | FplLeagueDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
  }

  export type $FplEntrySnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplEntrySnapshot"
    objects: {
      league: Prisma.$FplLeaguePayload<ExtArgs>
      event: Prisma.$FplGameweekPayload<ExtArgs>
      picks: Prisma.$FplEntryPickPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leagueId: number
      entryId: number
      eventId: number
      bank: number | null
      teamValue: number | null
      eventTransfers: number | null
      eventTransfersCost: number | null
      fetchedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fplEntrySnapshot"]>
    composites: {}
  }

  type FplEntrySnapshotGetPayload<S extends boolean | null | undefined | FplEntrySnapshotDefaultArgs> = $Result.GetResult<Prisma.$FplEntrySnapshotPayload, S>

  type FplEntrySnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplEntrySnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplEntrySnapshotCountAggregateInputType | true
    }

  export interface FplEntrySnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplEntrySnapshot'], meta: { name: 'FplEntrySnapshot' } }
    /**
     * Find zero or one FplEntrySnapshot that matches the filter.
     * @param {FplEntrySnapshotFindUniqueArgs} args - Arguments to find a FplEntrySnapshot
     * @example
     * // Get one FplEntrySnapshot
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplEntrySnapshotFindUniqueArgs>(args: SelectSubset<T, FplEntrySnapshotFindUniqueArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplEntrySnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplEntrySnapshotFindUniqueOrThrowArgs} args - Arguments to find a FplEntrySnapshot
     * @example
     * // Get one FplEntrySnapshot
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplEntrySnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, FplEntrySnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntrySnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotFindFirstArgs} args - Arguments to find a FplEntrySnapshot
     * @example
     * // Get one FplEntrySnapshot
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplEntrySnapshotFindFirstArgs>(args?: SelectSubset<T, FplEntrySnapshotFindFirstArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntrySnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotFindFirstOrThrowArgs} args - Arguments to find a FplEntrySnapshot
     * @example
     * // Get one FplEntrySnapshot
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplEntrySnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, FplEntrySnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplEntrySnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplEntrySnapshots
     * const fplEntrySnapshots = await prisma.fplEntrySnapshot.findMany()
     * 
     * // Get first 10 FplEntrySnapshots
     * const fplEntrySnapshots = await prisma.fplEntrySnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplEntrySnapshotWithIdOnly = await prisma.fplEntrySnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplEntrySnapshotFindManyArgs>(args?: SelectSubset<T, FplEntrySnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplEntrySnapshot.
     * @param {FplEntrySnapshotCreateArgs} args - Arguments to create a FplEntrySnapshot.
     * @example
     * // Create one FplEntrySnapshot
     * const FplEntrySnapshot = await prisma.fplEntrySnapshot.create({
     *   data: {
     *     // ... data to create a FplEntrySnapshot
     *   }
     * })
     * 
     */
    create<T extends FplEntrySnapshotCreateArgs>(args: SelectSubset<T, FplEntrySnapshotCreateArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplEntrySnapshots.
     * @param {FplEntrySnapshotCreateManyArgs} args - Arguments to create many FplEntrySnapshots.
     * @example
     * // Create many FplEntrySnapshots
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplEntrySnapshotCreateManyArgs>(args?: SelectSubset<T, FplEntrySnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplEntrySnapshots and returns the data saved in the database.
     * @param {FplEntrySnapshotCreateManyAndReturnArgs} args - Arguments to create many FplEntrySnapshots.
     * @example
     * // Create many FplEntrySnapshots
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplEntrySnapshots and only return the `id`
     * const fplEntrySnapshotWithIdOnly = await prisma.fplEntrySnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplEntrySnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, FplEntrySnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplEntrySnapshot.
     * @param {FplEntrySnapshotDeleteArgs} args - Arguments to delete one FplEntrySnapshot.
     * @example
     * // Delete one FplEntrySnapshot
     * const FplEntrySnapshot = await prisma.fplEntrySnapshot.delete({
     *   where: {
     *     // ... filter to delete one FplEntrySnapshot
     *   }
     * })
     * 
     */
    delete<T extends FplEntrySnapshotDeleteArgs>(args: SelectSubset<T, FplEntrySnapshotDeleteArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplEntrySnapshot.
     * @param {FplEntrySnapshotUpdateArgs} args - Arguments to update one FplEntrySnapshot.
     * @example
     * // Update one FplEntrySnapshot
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplEntrySnapshotUpdateArgs>(args: SelectSubset<T, FplEntrySnapshotUpdateArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplEntrySnapshots.
     * @param {FplEntrySnapshotDeleteManyArgs} args - Arguments to filter FplEntrySnapshots to delete.
     * @example
     * // Delete a few FplEntrySnapshots
     * const { count } = await prisma.fplEntrySnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplEntrySnapshotDeleteManyArgs>(args?: SelectSubset<T, FplEntrySnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntrySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplEntrySnapshots
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplEntrySnapshotUpdateManyArgs>(args: SelectSubset<T, FplEntrySnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntrySnapshots and returns the data updated in the database.
     * @param {FplEntrySnapshotUpdateManyAndReturnArgs} args - Arguments to update many FplEntrySnapshots.
     * @example
     * // Update many FplEntrySnapshots
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplEntrySnapshots and only return the `id`
     * const fplEntrySnapshotWithIdOnly = await prisma.fplEntrySnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplEntrySnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, FplEntrySnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplEntrySnapshot.
     * @param {FplEntrySnapshotUpsertArgs} args - Arguments to update or create a FplEntrySnapshot.
     * @example
     * // Update or create a FplEntrySnapshot
     * const fplEntrySnapshot = await prisma.fplEntrySnapshot.upsert({
     *   create: {
     *     // ... data to create a FplEntrySnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplEntrySnapshot we want to update
     *   }
     * })
     */
    upsert<T extends FplEntrySnapshotUpsertArgs>(args: SelectSubset<T, FplEntrySnapshotUpsertArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplEntrySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotCountArgs} args - Arguments to filter FplEntrySnapshots to count.
     * @example
     * // Count the number of FplEntrySnapshots
     * const count = await prisma.fplEntrySnapshot.count({
     *   where: {
     *     // ... the filter for the FplEntrySnapshots we want to count
     *   }
     * })
    **/
    count<T extends FplEntrySnapshotCountArgs>(
      args?: Subset<T, FplEntrySnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplEntrySnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplEntrySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplEntrySnapshotAggregateArgs>(args: Subset<T, FplEntrySnapshotAggregateArgs>): Prisma.PrismaPromise<GetFplEntrySnapshotAggregateType<T>>

    /**
     * Group by FplEntrySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntrySnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplEntrySnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplEntrySnapshotGroupByArgs['orderBy'] }
        : { orderBy?: FplEntrySnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplEntrySnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplEntrySnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplEntrySnapshot model
   */
  readonly fields: FplEntrySnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplEntrySnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplEntrySnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    league<T extends FplLeagueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplLeagueDefaultArgs<ExtArgs>>): Prisma__FplLeagueClient<$Result.GetResult<Prisma.$FplLeaguePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends FplGameweekDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplGameweekDefaultArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    picks<T extends FplEntrySnapshot$picksArgs<ExtArgs> = {}>(args?: Subset<T, FplEntrySnapshot$picksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplEntrySnapshot model
   */
  interface FplEntrySnapshotFieldRefs {
    readonly id: FieldRef<"FplEntrySnapshot", 'String'>
    readonly leagueId: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly entryId: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly eventId: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly bank: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly teamValue: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly eventTransfers: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly eventTransfersCost: FieldRef<"FplEntrySnapshot", 'Int'>
    readonly fetchedAt: FieldRef<"FplEntrySnapshot", 'DateTime'>
    readonly createdAt: FieldRef<"FplEntrySnapshot", 'DateTime'>
    readonly updatedAt: FieldRef<"FplEntrySnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplEntrySnapshot findUnique
   */
  export type FplEntrySnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which FplEntrySnapshot to fetch.
     */
    where: FplEntrySnapshotWhereUniqueInput
  }

  /**
   * FplEntrySnapshot findUniqueOrThrow
   */
  export type FplEntrySnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which FplEntrySnapshot to fetch.
     */
    where: FplEntrySnapshotWhereUniqueInput
  }

  /**
   * FplEntrySnapshot findFirst
   */
  export type FplEntrySnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which FplEntrySnapshot to fetch.
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntrySnapshots to fetch.
     */
    orderBy?: FplEntrySnapshotOrderByWithRelationInput | FplEntrySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntrySnapshots.
     */
    cursor?: FplEntrySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntrySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntrySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntrySnapshots.
     */
    distinct?: FplEntrySnapshotScalarFieldEnum | FplEntrySnapshotScalarFieldEnum[]
  }

  /**
   * FplEntrySnapshot findFirstOrThrow
   */
  export type FplEntrySnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which FplEntrySnapshot to fetch.
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntrySnapshots to fetch.
     */
    orderBy?: FplEntrySnapshotOrderByWithRelationInput | FplEntrySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntrySnapshots.
     */
    cursor?: FplEntrySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntrySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntrySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntrySnapshots.
     */
    distinct?: FplEntrySnapshotScalarFieldEnum | FplEntrySnapshotScalarFieldEnum[]
  }

  /**
   * FplEntrySnapshot findMany
   */
  export type FplEntrySnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * Filter, which FplEntrySnapshots to fetch.
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntrySnapshots to fetch.
     */
    orderBy?: FplEntrySnapshotOrderByWithRelationInput | FplEntrySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplEntrySnapshots.
     */
    cursor?: FplEntrySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntrySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntrySnapshots.
     */
    skip?: number
    distinct?: FplEntrySnapshotScalarFieldEnum | FplEntrySnapshotScalarFieldEnum[]
  }

  /**
   * FplEntrySnapshot create
   */
  export type FplEntrySnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a FplEntrySnapshot.
     */
    data: XOR<FplEntrySnapshotCreateInput, FplEntrySnapshotUncheckedCreateInput>
  }

  /**
   * FplEntrySnapshot createMany
   */
  export type FplEntrySnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplEntrySnapshots.
     */
    data: FplEntrySnapshotCreateManyInput | FplEntrySnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplEntrySnapshot createManyAndReturn
   */
  export type FplEntrySnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many FplEntrySnapshots.
     */
    data: FplEntrySnapshotCreateManyInput | FplEntrySnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntrySnapshot update
   */
  export type FplEntrySnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a FplEntrySnapshot.
     */
    data: XOR<FplEntrySnapshotUpdateInput, FplEntrySnapshotUncheckedUpdateInput>
    /**
     * Choose, which FplEntrySnapshot to update.
     */
    where: FplEntrySnapshotWhereUniqueInput
  }

  /**
   * FplEntrySnapshot updateMany
   */
  export type FplEntrySnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplEntrySnapshots.
     */
    data: XOR<FplEntrySnapshotUpdateManyMutationInput, FplEntrySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which FplEntrySnapshots to update
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * Limit how many FplEntrySnapshots to update.
     */
    limit?: number
  }

  /**
   * FplEntrySnapshot updateManyAndReturn
   */
  export type FplEntrySnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * The data used to update FplEntrySnapshots.
     */
    data: XOR<FplEntrySnapshotUpdateManyMutationInput, FplEntrySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which FplEntrySnapshots to update
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * Limit how many FplEntrySnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntrySnapshot upsert
   */
  export type FplEntrySnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the FplEntrySnapshot to update in case it exists.
     */
    where: FplEntrySnapshotWhereUniqueInput
    /**
     * In case the FplEntrySnapshot found by the `where` argument doesn't exist, create a new FplEntrySnapshot with this data.
     */
    create: XOR<FplEntrySnapshotCreateInput, FplEntrySnapshotUncheckedCreateInput>
    /**
     * In case the FplEntrySnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplEntrySnapshotUpdateInput, FplEntrySnapshotUncheckedUpdateInput>
  }

  /**
   * FplEntrySnapshot delete
   */
  export type FplEntrySnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
    /**
     * Filter which FplEntrySnapshot to delete.
     */
    where: FplEntrySnapshotWhereUniqueInput
  }

  /**
   * FplEntrySnapshot deleteMany
   */
  export type FplEntrySnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntrySnapshots to delete
     */
    where?: FplEntrySnapshotWhereInput
    /**
     * Limit how many FplEntrySnapshots to delete.
     */
    limit?: number
  }

  /**
   * FplEntrySnapshot.picks
   */
  export type FplEntrySnapshot$picksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    where?: FplEntryPickWhereInput
    orderBy?: FplEntryPickOrderByWithRelationInput | FplEntryPickOrderByWithRelationInput[]
    cursor?: FplEntryPickWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FplEntryPickScalarFieldEnum | FplEntryPickScalarFieldEnum[]
  }

  /**
   * FplEntrySnapshot without action
   */
  export type FplEntrySnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntrySnapshot
     */
    select?: FplEntrySnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntrySnapshot
     */
    omit?: FplEntrySnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntrySnapshotInclude<ExtArgs> | null
  }


  /**
   * Model FplEntryPick
   */

  export type AggregateFplEntryPick = {
    _count: FplEntryPickCountAggregateOutputType | null
    _avg: FplEntryPickAvgAggregateOutputType | null
    _sum: FplEntryPickSumAggregateOutputType | null
    _min: FplEntryPickMinAggregateOutputType | null
    _max: FplEntryPickMaxAggregateOutputType | null
  }

  export type FplEntryPickAvgAggregateOutputType = {
    playerId: number | null
    pickPosition: number | null
    multiplier: number | null
  }

  export type FplEntryPickSumAggregateOutputType = {
    playerId: number | null
    pickPosition: number | null
    multiplier: number | null
  }

  export type FplEntryPickMinAggregateOutputType = {
    id: string | null
    snapshotId: string | null
    playerId: number | null
    pickPosition: number | null
    multiplier: number | null
    isCaptain: boolean | null
    isViceCaptain: boolean | null
  }

  export type FplEntryPickMaxAggregateOutputType = {
    id: string | null
    snapshotId: string | null
    playerId: number | null
    pickPosition: number | null
    multiplier: number | null
    isCaptain: boolean | null
    isViceCaptain: boolean | null
  }

  export type FplEntryPickCountAggregateOutputType = {
    id: number
    snapshotId: number
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: number
    isViceCaptain: number
    _all: number
  }


  export type FplEntryPickAvgAggregateInputType = {
    playerId?: true
    pickPosition?: true
    multiplier?: true
  }

  export type FplEntryPickSumAggregateInputType = {
    playerId?: true
    pickPosition?: true
    multiplier?: true
  }

  export type FplEntryPickMinAggregateInputType = {
    id?: true
    snapshotId?: true
    playerId?: true
    pickPosition?: true
    multiplier?: true
    isCaptain?: true
    isViceCaptain?: true
  }

  export type FplEntryPickMaxAggregateInputType = {
    id?: true
    snapshotId?: true
    playerId?: true
    pickPosition?: true
    multiplier?: true
    isCaptain?: true
    isViceCaptain?: true
  }

  export type FplEntryPickCountAggregateInputType = {
    id?: true
    snapshotId?: true
    playerId?: true
    pickPosition?: true
    multiplier?: true
    isCaptain?: true
    isViceCaptain?: true
    _all?: true
  }

  export type FplEntryPickAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntryPick to aggregate.
     */
    where?: FplEntryPickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryPicks to fetch.
     */
    orderBy?: FplEntryPickOrderByWithRelationInput | FplEntryPickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplEntryPickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryPicks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryPicks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplEntryPicks
    **/
    _count?: true | FplEntryPickCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplEntryPickAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplEntryPickSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplEntryPickMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplEntryPickMaxAggregateInputType
  }

  export type GetFplEntryPickAggregateType<T extends FplEntryPickAggregateArgs> = {
        [P in keyof T & keyof AggregateFplEntryPick]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplEntryPick[P]>
      : GetScalarType<T[P], AggregateFplEntryPick[P]>
  }




  export type FplEntryPickGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryPickWhereInput
    orderBy?: FplEntryPickOrderByWithAggregationInput | FplEntryPickOrderByWithAggregationInput[]
    by: FplEntryPickScalarFieldEnum[] | FplEntryPickScalarFieldEnum
    having?: FplEntryPickScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplEntryPickCountAggregateInputType | true
    _avg?: FplEntryPickAvgAggregateInputType
    _sum?: FplEntryPickSumAggregateInputType
    _min?: FplEntryPickMinAggregateInputType
    _max?: FplEntryPickMaxAggregateInputType
  }

  export type FplEntryPickGroupByOutputType = {
    id: string
    snapshotId: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
    _count: FplEntryPickCountAggregateOutputType | null
    _avg: FplEntryPickAvgAggregateOutputType | null
    _sum: FplEntryPickSumAggregateOutputType | null
    _min: FplEntryPickMinAggregateOutputType | null
    _max: FplEntryPickMaxAggregateOutputType | null
  }

  type GetFplEntryPickGroupByPayload<T extends FplEntryPickGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplEntryPickGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplEntryPickGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplEntryPickGroupByOutputType[P]>
            : GetScalarType<T[P], FplEntryPickGroupByOutputType[P]>
        }
      >
    >


  export type FplEntryPickSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotId?: boolean
    playerId?: boolean
    pickPosition?: boolean
    multiplier?: boolean
    isCaptain?: boolean
    isViceCaptain?: boolean
    snapshot?: boolean | FplEntrySnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryPick"]>

  export type FplEntryPickSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotId?: boolean
    playerId?: boolean
    pickPosition?: boolean
    multiplier?: boolean
    isCaptain?: boolean
    isViceCaptain?: boolean
    snapshot?: boolean | FplEntrySnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryPick"]>

  export type FplEntryPickSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotId?: boolean
    playerId?: boolean
    pickPosition?: boolean
    multiplier?: boolean
    isCaptain?: boolean
    isViceCaptain?: boolean
    snapshot?: boolean | FplEntrySnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryPick"]>

  export type FplEntryPickSelectScalar = {
    id?: boolean
    snapshotId?: boolean
    playerId?: boolean
    pickPosition?: boolean
    multiplier?: boolean
    isCaptain?: boolean
    isViceCaptain?: boolean
  }

  export type FplEntryPickOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "snapshotId" | "playerId" | "pickPosition" | "multiplier" | "isCaptain" | "isViceCaptain", ExtArgs["result"]["fplEntryPick"]>
  export type FplEntryPickInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | FplEntrySnapshotDefaultArgs<ExtArgs>
  }
  export type FplEntryPickIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | FplEntrySnapshotDefaultArgs<ExtArgs>
  }
  export type FplEntryPickIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | FplEntrySnapshotDefaultArgs<ExtArgs>
  }

  export type $FplEntryPickPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplEntryPick"
    objects: {
      snapshot: Prisma.$FplEntrySnapshotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      snapshotId: string
      playerId: number
      pickPosition: number
      multiplier: number
      isCaptain: boolean
      isViceCaptain: boolean
    }, ExtArgs["result"]["fplEntryPick"]>
    composites: {}
  }

  type FplEntryPickGetPayload<S extends boolean | null | undefined | FplEntryPickDefaultArgs> = $Result.GetResult<Prisma.$FplEntryPickPayload, S>

  type FplEntryPickCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplEntryPickFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplEntryPickCountAggregateInputType | true
    }

  export interface FplEntryPickDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplEntryPick'], meta: { name: 'FplEntryPick' } }
    /**
     * Find zero or one FplEntryPick that matches the filter.
     * @param {FplEntryPickFindUniqueArgs} args - Arguments to find a FplEntryPick
     * @example
     * // Get one FplEntryPick
     * const fplEntryPick = await prisma.fplEntryPick.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplEntryPickFindUniqueArgs>(args: SelectSubset<T, FplEntryPickFindUniqueArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplEntryPick that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplEntryPickFindUniqueOrThrowArgs} args - Arguments to find a FplEntryPick
     * @example
     * // Get one FplEntryPick
     * const fplEntryPick = await prisma.fplEntryPick.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplEntryPickFindUniqueOrThrowArgs>(args: SelectSubset<T, FplEntryPickFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntryPick that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickFindFirstArgs} args - Arguments to find a FplEntryPick
     * @example
     * // Get one FplEntryPick
     * const fplEntryPick = await prisma.fplEntryPick.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplEntryPickFindFirstArgs>(args?: SelectSubset<T, FplEntryPickFindFirstArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntryPick that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickFindFirstOrThrowArgs} args - Arguments to find a FplEntryPick
     * @example
     * // Get one FplEntryPick
     * const fplEntryPick = await prisma.fplEntryPick.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplEntryPickFindFirstOrThrowArgs>(args?: SelectSubset<T, FplEntryPickFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplEntryPicks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplEntryPicks
     * const fplEntryPicks = await prisma.fplEntryPick.findMany()
     * 
     * // Get first 10 FplEntryPicks
     * const fplEntryPicks = await prisma.fplEntryPick.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplEntryPickWithIdOnly = await prisma.fplEntryPick.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplEntryPickFindManyArgs>(args?: SelectSubset<T, FplEntryPickFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplEntryPick.
     * @param {FplEntryPickCreateArgs} args - Arguments to create a FplEntryPick.
     * @example
     * // Create one FplEntryPick
     * const FplEntryPick = await prisma.fplEntryPick.create({
     *   data: {
     *     // ... data to create a FplEntryPick
     *   }
     * })
     * 
     */
    create<T extends FplEntryPickCreateArgs>(args: SelectSubset<T, FplEntryPickCreateArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplEntryPicks.
     * @param {FplEntryPickCreateManyArgs} args - Arguments to create many FplEntryPicks.
     * @example
     * // Create many FplEntryPicks
     * const fplEntryPick = await prisma.fplEntryPick.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplEntryPickCreateManyArgs>(args?: SelectSubset<T, FplEntryPickCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplEntryPicks and returns the data saved in the database.
     * @param {FplEntryPickCreateManyAndReturnArgs} args - Arguments to create many FplEntryPicks.
     * @example
     * // Create many FplEntryPicks
     * const fplEntryPick = await prisma.fplEntryPick.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplEntryPicks and only return the `id`
     * const fplEntryPickWithIdOnly = await prisma.fplEntryPick.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplEntryPickCreateManyAndReturnArgs>(args?: SelectSubset<T, FplEntryPickCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplEntryPick.
     * @param {FplEntryPickDeleteArgs} args - Arguments to delete one FplEntryPick.
     * @example
     * // Delete one FplEntryPick
     * const FplEntryPick = await prisma.fplEntryPick.delete({
     *   where: {
     *     // ... filter to delete one FplEntryPick
     *   }
     * })
     * 
     */
    delete<T extends FplEntryPickDeleteArgs>(args: SelectSubset<T, FplEntryPickDeleteArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplEntryPick.
     * @param {FplEntryPickUpdateArgs} args - Arguments to update one FplEntryPick.
     * @example
     * // Update one FplEntryPick
     * const fplEntryPick = await prisma.fplEntryPick.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplEntryPickUpdateArgs>(args: SelectSubset<T, FplEntryPickUpdateArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplEntryPicks.
     * @param {FplEntryPickDeleteManyArgs} args - Arguments to filter FplEntryPicks to delete.
     * @example
     * // Delete a few FplEntryPicks
     * const { count } = await prisma.fplEntryPick.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplEntryPickDeleteManyArgs>(args?: SelectSubset<T, FplEntryPickDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntryPicks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplEntryPicks
     * const fplEntryPick = await prisma.fplEntryPick.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplEntryPickUpdateManyArgs>(args: SelectSubset<T, FplEntryPickUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntryPicks and returns the data updated in the database.
     * @param {FplEntryPickUpdateManyAndReturnArgs} args - Arguments to update many FplEntryPicks.
     * @example
     * // Update many FplEntryPicks
     * const fplEntryPick = await prisma.fplEntryPick.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplEntryPicks and only return the `id`
     * const fplEntryPickWithIdOnly = await prisma.fplEntryPick.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplEntryPickUpdateManyAndReturnArgs>(args: SelectSubset<T, FplEntryPickUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplEntryPick.
     * @param {FplEntryPickUpsertArgs} args - Arguments to update or create a FplEntryPick.
     * @example
     * // Update or create a FplEntryPick
     * const fplEntryPick = await prisma.fplEntryPick.upsert({
     *   create: {
     *     // ... data to create a FplEntryPick
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplEntryPick we want to update
     *   }
     * })
     */
    upsert<T extends FplEntryPickUpsertArgs>(args: SelectSubset<T, FplEntryPickUpsertArgs<ExtArgs>>): Prisma__FplEntryPickClient<$Result.GetResult<Prisma.$FplEntryPickPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplEntryPicks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickCountArgs} args - Arguments to filter FplEntryPicks to count.
     * @example
     * // Count the number of FplEntryPicks
     * const count = await prisma.fplEntryPick.count({
     *   where: {
     *     // ... the filter for the FplEntryPicks we want to count
     *   }
     * })
    **/
    count<T extends FplEntryPickCountArgs>(
      args?: Subset<T, FplEntryPickCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplEntryPickCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplEntryPick.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplEntryPickAggregateArgs>(args: Subset<T, FplEntryPickAggregateArgs>): Prisma.PrismaPromise<GetFplEntryPickAggregateType<T>>

    /**
     * Group by FplEntryPick.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryPickGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplEntryPickGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplEntryPickGroupByArgs['orderBy'] }
        : { orderBy?: FplEntryPickGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplEntryPickGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplEntryPickGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplEntryPick model
   */
  readonly fields: FplEntryPickFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplEntryPick.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplEntryPickClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    snapshot<T extends FplEntrySnapshotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplEntrySnapshotDefaultArgs<ExtArgs>>): Prisma__FplEntrySnapshotClient<$Result.GetResult<Prisma.$FplEntrySnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplEntryPick model
   */
  interface FplEntryPickFieldRefs {
    readonly id: FieldRef<"FplEntryPick", 'String'>
    readonly snapshotId: FieldRef<"FplEntryPick", 'String'>
    readonly playerId: FieldRef<"FplEntryPick", 'Int'>
    readonly pickPosition: FieldRef<"FplEntryPick", 'Int'>
    readonly multiplier: FieldRef<"FplEntryPick", 'Int'>
    readonly isCaptain: FieldRef<"FplEntryPick", 'Boolean'>
    readonly isViceCaptain: FieldRef<"FplEntryPick", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * FplEntryPick findUnique
   */
  export type FplEntryPickFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryPick to fetch.
     */
    where: FplEntryPickWhereUniqueInput
  }

  /**
   * FplEntryPick findUniqueOrThrow
   */
  export type FplEntryPickFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryPick to fetch.
     */
    where: FplEntryPickWhereUniqueInput
  }

  /**
   * FplEntryPick findFirst
   */
  export type FplEntryPickFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryPick to fetch.
     */
    where?: FplEntryPickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryPicks to fetch.
     */
    orderBy?: FplEntryPickOrderByWithRelationInput | FplEntryPickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntryPicks.
     */
    cursor?: FplEntryPickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryPicks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryPicks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntryPicks.
     */
    distinct?: FplEntryPickScalarFieldEnum | FplEntryPickScalarFieldEnum[]
  }

  /**
   * FplEntryPick findFirstOrThrow
   */
  export type FplEntryPickFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryPick to fetch.
     */
    where?: FplEntryPickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryPicks to fetch.
     */
    orderBy?: FplEntryPickOrderByWithRelationInput | FplEntryPickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntryPicks.
     */
    cursor?: FplEntryPickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryPicks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryPicks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntryPicks.
     */
    distinct?: FplEntryPickScalarFieldEnum | FplEntryPickScalarFieldEnum[]
  }

  /**
   * FplEntryPick findMany
   */
  export type FplEntryPickFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryPicks to fetch.
     */
    where?: FplEntryPickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryPicks to fetch.
     */
    orderBy?: FplEntryPickOrderByWithRelationInput | FplEntryPickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplEntryPicks.
     */
    cursor?: FplEntryPickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryPicks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryPicks.
     */
    skip?: number
    distinct?: FplEntryPickScalarFieldEnum | FplEntryPickScalarFieldEnum[]
  }

  /**
   * FplEntryPick create
   */
  export type FplEntryPickCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * The data needed to create a FplEntryPick.
     */
    data: XOR<FplEntryPickCreateInput, FplEntryPickUncheckedCreateInput>
  }

  /**
   * FplEntryPick createMany
   */
  export type FplEntryPickCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplEntryPicks.
     */
    data: FplEntryPickCreateManyInput | FplEntryPickCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplEntryPick createManyAndReturn
   */
  export type FplEntryPickCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * The data used to create many FplEntryPicks.
     */
    data: FplEntryPickCreateManyInput | FplEntryPickCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntryPick update
   */
  export type FplEntryPickUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * The data needed to update a FplEntryPick.
     */
    data: XOR<FplEntryPickUpdateInput, FplEntryPickUncheckedUpdateInput>
    /**
     * Choose, which FplEntryPick to update.
     */
    where: FplEntryPickWhereUniqueInput
  }

  /**
   * FplEntryPick updateMany
   */
  export type FplEntryPickUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplEntryPicks.
     */
    data: XOR<FplEntryPickUpdateManyMutationInput, FplEntryPickUncheckedUpdateManyInput>
    /**
     * Filter which FplEntryPicks to update
     */
    where?: FplEntryPickWhereInput
    /**
     * Limit how many FplEntryPicks to update.
     */
    limit?: number
  }

  /**
   * FplEntryPick updateManyAndReturn
   */
  export type FplEntryPickUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * The data used to update FplEntryPicks.
     */
    data: XOR<FplEntryPickUpdateManyMutationInput, FplEntryPickUncheckedUpdateManyInput>
    /**
     * Filter which FplEntryPicks to update
     */
    where?: FplEntryPickWhereInput
    /**
     * Limit how many FplEntryPicks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntryPick upsert
   */
  export type FplEntryPickUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * The filter to search for the FplEntryPick to update in case it exists.
     */
    where: FplEntryPickWhereUniqueInput
    /**
     * In case the FplEntryPick found by the `where` argument doesn't exist, create a new FplEntryPick with this data.
     */
    create: XOR<FplEntryPickCreateInput, FplEntryPickUncheckedCreateInput>
    /**
     * In case the FplEntryPick was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplEntryPickUpdateInput, FplEntryPickUncheckedUpdateInput>
  }

  /**
   * FplEntryPick delete
   */
  export type FplEntryPickDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
    /**
     * Filter which FplEntryPick to delete.
     */
    where: FplEntryPickWhereUniqueInput
  }

  /**
   * FplEntryPick deleteMany
   */
  export type FplEntryPickDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntryPicks to delete
     */
    where?: FplEntryPickWhereInput
    /**
     * Limit how many FplEntryPicks to delete.
     */
    limit?: number
  }

  /**
   * FplEntryPick without action
   */
  export type FplEntryPickDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryPick
     */
    select?: FplEntryPickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryPick
     */
    omit?: FplEntryPickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryPickInclude<ExtArgs> | null
  }


  /**
   * Model FplEntryTransfer
   */

  export type AggregateFplEntryTransfer = {
    _count: FplEntryTransferCountAggregateOutputType | null
    _avg: FplEntryTransferAvgAggregateOutputType | null
    _sum: FplEntryTransferSumAggregateOutputType | null
    _min: FplEntryTransferMinAggregateOutputType | null
    _max: FplEntryTransferMaxAggregateOutputType | null
  }

  export type FplEntryTransferAvgAggregateOutputType = {
    entryId: number | null
    eventId: number | null
    playerInId: number | null
    playerOutId: number | null
    value: number | null
    bank: number | null
    cost: number | null
  }

  export type FplEntryTransferSumAggregateOutputType = {
    entryId: number | null
    eventId: number | null
    playerInId: number | null
    playerOutId: number | null
    value: number | null
    bank: number | null
    cost: number | null
  }

  export type FplEntryTransferMinAggregateOutputType = {
    id: string | null
    entryId: number | null
    eventId: number | null
    time: Date | null
    playerInId: number | null
    playerOutId: number | null
    value: number | null
    bank: number | null
    cost: number | null
    createdAt: Date | null
  }

  export type FplEntryTransferMaxAggregateOutputType = {
    id: string | null
    entryId: number | null
    eventId: number | null
    time: Date | null
    playerInId: number | null
    playerOutId: number | null
    value: number | null
    bank: number | null
    cost: number | null
    createdAt: Date | null
  }

  export type FplEntryTransferCountAggregateOutputType = {
    id: number
    entryId: number
    eventId: number
    time: number
    playerInId: number
    playerOutId: number
    value: number
    bank: number
    cost: number
    createdAt: number
    _all: number
  }


  export type FplEntryTransferAvgAggregateInputType = {
    entryId?: true
    eventId?: true
    playerInId?: true
    playerOutId?: true
    value?: true
    bank?: true
    cost?: true
  }

  export type FplEntryTransferSumAggregateInputType = {
    entryId?: true
    eventId?: true
    playerInId?: true
    playerOutId?: true
    value?: true
    bank?: true
    cost?: true
  }

  export type FplEntryTransferMinAggregateInputType = {
    id?: true
    entryId?: true
    eventId?: true
    time?: true
    playerInId?: true
    playerOutId?: true
    value?: true
    bank?: true
    cost?: true
    createdAt?: true
  }

  export type FplEntryTransferMaxAggregateInputType = {
    id?: true
    entryId?: true
    eventId?: true
    time?: true
    playerInId?: true
    playerOutId?: true
    value?: true
    bank?: true
    cost?: true
    createdAt?: true
  }

  export type FplEntryTransferCountAggregateInputType = {
    id?: true
    entryId?: true
    eventId?: true
    time?: true
    playerInId?: true
    playerOutId?: true
    value?: true
    bank?: true
    cost?: true
    createdAt?: true
    _all?: true
  }

  export type FplEntryTransferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntryTransfer to aggregate.
     */
    where?: FplEntryTransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryTransfers to fetch.
     */
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplEntryTransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryTransfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryTransfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplEntryTransfers
    **/
    _count?: true | FplEntryTransferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplEntryTransferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplEntryTransferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplEntryTransferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplEntryTransferMaxAggregateInputType
  }

  export type GetFplEntryTransferAggregateType<T extends FplEntryTransferAggregateArgs> = {
        [P in keyof T & keyof AggregateFplEntryTransfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplEntryTransfer[P]>
      : GetScalarType<T[P], AggregateFplEntryTransfer[P]>
  }




  export type FplEntryTransferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryTransferWhereInput
    orderBy?: FplEntryTransferOrderByWithAggregationInput | FplEntryTransferOrderByWithAggregationInput[]
    by: FplEntryTransferScalarFieldEnum[] | FplEntryTransferScalarFieldEnum
    having?: FplEntryTransferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplEntryTransferCountAggregateInputType | true
    _avg?: FplEntryTransferAvgAggregateInputType
    _sum?: FplEntryTransferSumAggregateInputType
    _min?: FplEntryTransferMinAggregateInputType
    _max?: FplEntryTransferMaxAggregateInputType
  }

  export type FplEntryTransferGroupByOutputType = {
    id: string
    entryId: number
    eventId: number
    time: Date
    playerInId: number
    playerOutId: number
    value: number | null
    bank: number | null
    cost: number | null
    createdAt: Date
    _count: FplEntryTransferCountAggregateOutputType | null
    _avg: FplEntryTransferAvgAggregateOutputType | null
    _sum: FplEntryTransferSumAggregateOutputType | null
    _min: FplEntryTransferMinAggregateOutputType | null
    _max: FplEntryTransferMaxAggregateOutputType | null
  }

  type GetFplEntryTransferGroupByPayload<T extends FplEntryTransferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplEntryTransferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplEntryTransferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplEntryTransferGroupByOutputType[P]>
            : GetScalarType<T[P], FplEntryTransferGroupByOutputType[P]>
        }
      >
    >


  export type FplEntryTransferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    eventId?: boolean
    time?: boolean
    playerInId?: boolean
    playerOutId?: boolean
    value?: boolean
    bank?: boolean
    cost?: boolean
    createdAt?: boolean
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    playerIn?: boolean | FplPlayerDefaultArgs<ExtArgs>
    playerOut?: boolean | FplPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryTransfer"]>

  export type FplEntryTransferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    eventId?: boolean
    time?: boolean
    playerInId?: boolean
    playerOutId?: boolean
    value?: boolean
    bank?: boolean
    cost?: boolean
    createdAt?: boolean
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    playerIn?: boolean | FplPlayerDefaultArgs<ExtArgs>
    playerOut?: boolean | FplPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryTransfer"]>

  export type FplEntryTransferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    eventId?: boolean
    time?: boolean
    playerInId?: boolean
    playerOutId?: boolean
    value?: boolean
    bank?: boolean
    cost?: boolean
    createdAt?: boolean
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    playerIn?: boolean | FplPlayerDefaultArgs<ExtArgs>
    playerOut?: boolean | FplPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryTransfer"]>

  export type FplEntryTransferSelectScalar = {
    id?: boolean
    entryId?: boolean
    eventId?: boolean
    time?: boolean
    playerInId?: boolean
    playerOutId?: boolean
    value?: boolean
    bank?: boolean
    cost?: boolean
    createdAt?: boolean
  }

  export type FplEntryTransferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entryId" | "eventId" | "time" | "playerInId" | "playerOutId" | "value" | "bank" | "cost" | "createdAt", ExtArgs["result"]["fplEntryTransfer"]>
  export type FplEntryTransferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    playerIn?: boolean | FplPlayerDefaultArgs<ExtArgs>
    playerOut?: boolean | FplPlayerDefaultArgs<ExtArgs>
  }
  export type FplEntryTransferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    playerIn?: boolean | FplPlayerDefaultArgs<ExtArgs>
    playerOut?: boolean | FplPlayerDefaultArgs<ExtArgs>
  }
  export type FplEntryTransferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
    event?: boolean | FplGameweekDefaultArgs<ExtArgs>
    playerIn?: boolean | FplPlayerDefaultArgs<ExtArgs>
    playerOut?: boolean | FplPlayerDefaultArgs<ExtArgs>
  }

  export type $FplEntryTransferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplEntryTransfer"
    objects: {
      entry: Prisma.$FplLeagueEntryPayload<ExtArgs>
      event: Prisma.$FplGameweekPayload<ExtArgs>
      playerIn: Prisma.$FplPlayerPayload<ExtArgs>
      playerOut: Prisma.$FplPlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entryId: number
      eventId: number
      time: Date
      playerInId: number
      playerOutId: number
      value: number | null
      bank: number | null
      cost: number | null
      createdAt: Date
    }, ExtArgs["result"]["fplEntryTransfer"]>
    composites: {}
  }

  type FplEntryTransferGetPayload<S extends boolean | null | undefined | FplEntryTransferDefaultArgs> = $Result.GetResult<Prisma.$FplEntryTransferPayload, S>

  type FplEntryTransferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplEntryTransferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplEntryTransferCountAggregateInputType | true
    }

  export interface FplEntryTransferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplEntryTransfer'], meta: { name: 'FplEntryTransfer' } }
    /**
     * Find zero or one FplEntryTransfer that matches the filter.
     * @param {FplEntryTransferFindUniqueArgs} args - Arguments to find a FplEntryTransfer
     * @example
     * // Get one FplEntryTransfer
     * const fplEntryTransfer = await prisma.fplEntryTransfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplEntryTransferFindUniqueArgs>(args: SelectSubset<T, FplEntryTransferFindUniqueArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplEntryTransfer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplEntryTransferFindUniqueOrThrowArgs} args - Arguments to find a FplEntryTransfer
     * @example
     * // Get one FplEntryTransfer
     * const fplEntryTransfer = await prisma.fplEntryTransfer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplEntryTransferFindUniqueOrThrowArgs>(args: SelectSubset<T, FplEntryTransferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntryTransfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferFindFirstArgs} args - Arguments to find a FplEntryTransfer
     * @example
     * // Get one FplEntryTransfer
     * const fplEntryTransfer = await prisma.fplEntryTransfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplEntryTransferFindFirstArgs>(args?: SelectSubset<T, FplEntryTransferFindFirstArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntryTransfer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferFindFirstOrThrowArgs} args - Arguments to find a FplEntryTransfer
     * @example
     * // Get one FplEntryTransfer
     * const fplEntryTransfer = await prisma.fplEntryTransfer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplEntryTransferFindFirstOrThrowArgs>(args?: SelectSubset<T, FplEntryTransferFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplEntryTransfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplEntryTransfers
     * const fplEntryTransfers = await prisma.fplEntryTransfer.findMany()
     * 
     * // Get first 10 FplEntryTransfers
     * const fplEntryTransfers = await prisma.fplEntryTransfer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplEntryTransferWithIdOnly = await prisma.fplEntryTransfer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplEntryTransferFindManyArgs>(args?: SelectSubset<T, FplEntryTransferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplEntryTransfer.
     * @param {FplEntryTransferCreateArgs} args - Arguments to create a FplEntryTransfer.
     * @example
     * // Create one FplEntryTransfer
     * const FplEntryTransfer = await prisma.fplEntryTransfer.create({
     *   data: {
     *     // ... data to create a FplEntryTransfer
     *   }
     * })
     * 
     */
    create<T extends FplEntryTransferCreateArgs>(args: SelectSubset<T, FplEntryTransferCreateArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplEntryTransfers.
     * @param {FplEntryTransferCreateManyArgs} args - Arguments to create many FplEntryTransfers.
     * @example
     * // Create many FplEntryTransfers
     * const fplEntryTransfer = await prisma.fplEntryTransfer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplEntryTransferCreateManyArgs>(args?: SelectSubset<T, FplEntryTransferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplEntryTransfers and returns the data saved in the database.
     * @param {FplEntryTransferCreateManyAndReturnArgs} args - Arguments to create many FplEntryTransfers.
     * @example
     * // Create many FplEntryTransfers
     * const fplEntryTransfer = await prisma.fplEntryTransfer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplEntryTransfers and only return the `id`
     * const fplEntryTransferWithIdOnly = await prisma.fplEntryTransfer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplEntryTransferCreateManyAndReturnArgs>(args?: SelectSubset<T, FplEntryTransferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplEntryTransfer.
     * @param {FplEntryTransferDeleteArgs} args - Arguments to delete one FplEntryTransfer.
     * @example
     * // Delete one FplEntryTransfer
     * const FplEntryTransfer = await prisma.fplEntryTransfer.delete({
     *   where: {
     *     // ... filter to delete one FplEntryTransfer
     *   }
     * })
     * 
     */
    delete<T extends FplEntryTransferDeleteArgs>(args: SelectSubset<T, FplEntryTransferDeleteArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplEntryTransfer.
     * @param {FplEntryTransferUpdateArgs} args - Arguments to update one FplEntryTransfer.
     * @example
     * // Update one FplEntryTransfer
     * const fplEntryTransfer = await prisma.fplEntryTransfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplEntryTransferUpdateArgs>(args: SelectSubset<T, FplEntryTransferUpdateArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplEntryTransfers.
     * @param {FplEntryTransferDeleteManyArgs} args - Arguments to filter FplEntryTransfers to delete.
     * @example
     * // Delete a few FplEntryTransfers
     * const { count } = await prisma.fplEntryTransfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplEntryTransferDeleteManyArgs>(args?: SelectSubset<T, FplEntryTransferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntryTransfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplEntryTransfers
     * const fplEntryTransfer = await prisma.fplEntryTransfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplEntryTransferUpdateManyArgs>(args: SelectSubset<T, FplEntryTransferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntryTransfers and returns the data updated in the database.
     * @param {FplEntryTransferUpdateManyAndReturnArgs} args - Arguments to update many FplEntryTransfers.
     * @example
     * // Update many FplEntryTransfers
     * const fplEntryTransfer = await prisma.fplEntryTransfer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplEntryTransfers and only return the `id`
     * const fplEntryTransferWithIdOnly = await prisma.fplEntryTransfer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplEntryTransferUpdateManyAndReturnArgs>(args: SelectSubset<T, FplEntryTransferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplEntryTransfer.
     * @param {FplEntryTransferUpsertArgs} args - Arguments to update or create a FplEntryTransfer.
     * @example
     * // Update or create a FplEntryTransfer
     * const fplEntryTransfer = await prisma.fplEntryTransfer.upsert({
     *   create: {
     *     // ... data to create a FplEntryTransfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplEntryTransfer we want to update
     *   }
     * })
     */
    upsert<T extends FplEntryTransferUpsertArgs>(args: SelectSubset<T, FplEntryTransferUpsertArgs<ExtArgs>>): Prisma__FplEntryTransferClient<$Result.GetResult<Prisma.$FplEntryTransferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplEntryTransfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferCountArgs} args - Arguments to filter FplEntryTransfers to count.
     * @example
     * // Count the number of FplEntryTransfers
     * const count = await prisma.fplEntryTransfer.count({
     *   where: {
     *     // ... the filter for the FplEntryTransfers we want to count
     *   }
     * })
    **/
    count<T extends FplEntryTransferCountArgs>(
      args?: Subset<T, FplEntryTransferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplEntryTransferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplEntryTransfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplEntryTransferAggregateArgs>(args: Subset<T, FplEntryTransferAggregateArgs>): Prisma.PrismaPromise<GetFplEntryTransferAggregateType<T>>

    /**
     * Group by FplEntryTransfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryTransferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplEntryTransferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplEntryTransferGroupByArgs['orderBy'] }
        : { orderBy?: FplEntryTransferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplEntryTransferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplEntryTransferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplEntryTransfer model
   */
  readonly fields: FplEntryTransferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplEntryTransfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplEntryTransferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends FplLeagueEntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplLeagueEntryDefaultArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends FplGameweekDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplGameweekDefaultArgs<ExtArgs>>): Prisma__FplGameweekClient<$Result.GetResult<Prisma.$FplGameweekPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    playerIn<T extends FplPlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplPlayerDefaultArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    playerOut<T extends FplPlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplPlayerDefaultArgs<ExtArgs>>): Prisma__FplPlayerClient<$Result.GetResult<Prisma.$FplPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplEntryTransfer model
   */
  interface FplEntryTransferFieldRefs {
    readonly id: FieldRef<"FplEntryTransfer", 'String'>
    readonly entryId: FieldRef<"FplEntryTransfer", 'Int'>
    readonly eventId: FieldRef<"FplEntryTransfer", 'Int'>
    readonly time: FieldRef<"FplEntryTransfer", 'DateTime'>
    readonly playerInId: FieldRef<"FplEntryTransfer", 'Int'>
    readonly playerOutId: FieldRef<"FplEntryTransfer", 'Int'>
    readonly value: FieldRef<"FplEntryTransfer", 'Int'>
    readonly bank: FieldRef<"FplEntryTransfer", 'Int'>
    readonly cost: FieldRef<"FplEntryTransfer", 'Int'>
    readonly createdAt: FieldRef<"FplEntryTransfer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplEntryTransfer findUnique
   */
  export type FplEntryTransferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryTransfer to fetch.
     */
    where: FplEntryTransferWhereUniqueInput
  }

  /**
   * FplEntryTransfer findUniqueOrThrow
   */
  export type FplEntryTransferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryTransfer to fetch.
     */
    where: FplEntryTransferWhereUniqueInput
  }

  /**
   * FplEntryTransfer findFirst
   */
  export type FplEntryTransferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryTransfer to fetch.
     */
    where?: FplEntryTransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryTransfers to fetch.
     */
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntryTransfers.
     */
    cursor?: FplEntryTransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryTransfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryTransfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntryTransfers.
     */
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplEntryTransfer findFirstOrThrow
   */
  export type FplEntryTransferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryTransfer to fetch.
     */
    where?: FplEntryTransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryTransfers to fetch.
     */
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntryTransfers.
     */
    cursor?: FplEntryTransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryTransfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryTransfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntryTransfers.
     */
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplEntryTransfer findMany
   */
  export type FplEntryTransferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryTransfers to fetch.
     */
    where?: FplEntryTransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryTransfers to fetch.
     */
    orderBy?: FplEntryTransferOrderByWithRelationInput | FplEntryTransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplEntryTransfers.
     */
    cursor?: FplEntryTransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryTransfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryTransfers.
     */
    skip?: number
    distinct?: FplEntryTransferScalarFieldEnum | FplEntryTransferScalarFieldEnum[]
  }

  /**
   * FplEntryTransfer create
   */
  export type FplEntryTransferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * The data needed to create a FplEntryTransfer.
     */
    data: XOR<FplEntryTransferCreateInput, FplEntryTransferUncheckedCreateInput>
  }

  /**
   * FplEntryTransfer createMany
   */
  export type FplEntryTransferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplEntryTransfers.
     */
    data: FplEntryTransferCreateManyInput | FplEntryTransferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplEntryTransfer createManyAndReturn
   */
  export type FplEntryTransferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * The data used to create many FplEntryTransfers.
     */
    data: FplEntryTransferCreateManyInput | FplEntryTransferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntryTransfer update
   */
  export type FplEntryTransferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * The data needed to update a FplEntryTransfer.
     */
    data: XOR<FplEntryTransferUpdateInput, FplEntryTransferUncheckedUpdateInput>
    /**
     * Choose, which FplEntryTransfer to update.
     */
    where: FplEntryTransferWhereUniqueInput
  }

  /**
   * FplEntryTransfer updateMany
   */
  export type FplEntryTransferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplEntryTransfers.
     */
    data: XOR<FplEntryTransferUpdateManyMutationInput, FplEntryTransferUncheckedUpdateManyInput>
    /**
     * Filter which FplEntryTransfers to update
     */
    where?: FplEntryTransferWhereInput
    /**
     * Limit how many FplEntryTransfers to update.
     */
    limit?: number
  }

  /**
   * FplEntryTransfer updateManyAndReturn
   */
  export type FplEntryTransferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * The data used to update FplEntryTransfers.
     */
    data: XOR<FplEntryTransferUpdateManyMutationInput, FplEntryTransferUncheckedUpdateManyInput>
    /**
     * Filter which FplEntryTransfers to update
     */
    where?: FplEntryTransferWhereInput
    /**
     * Limit how many FplEntryTransfers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntryTransfer upsert
   */
  export type FplEntryTransferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * The filter to search for the FplEntryTransfer to update in case it exists.
     */
    where: FplEntryTransferWhereUniqueInput
    /**
     * In case the FplEntryTransfer found by the `where` argument doesn't exist, create a new FplEntryTransfer with this data.
     */
    create: XOR<FplEntryTransferCreateInput, FplEntryTransferUncheckedCreateInput>
    /**
     * In case the FplEntryTransfer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplEntryTransferUpdateInput, FplEntryTransferUncheckedUpdateInput>
  }

  /**
   * FplEntryTransfer delete
   */
  export type FplEntryTransferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
    /**
     * Filter which FplEntryTransfer to delete.
     */
    where: FplEntryTransferWhereUniqueInput
  }

  /**
   * FplEntryTransfer deleteMany
   */
  export type FplEntryTransferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntryTransfers to delete
     */
    where?: FplEntryTransferWhereInput
    /**
     * Limit how many FplEntryTransfers to delete.
     */
    limit?: number
  }

  /**
   * FplEntryTransfer without action
   */
  export type FplEntryTransferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryTransfer
     */
    select?: FplEntryTransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryTransfer
     */
    omit?: FplEntryTransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryTransferInclude<ExtArgs> | null
  }


  /**
   * Model FplEntryBehaviourProfile
   */

  export type AggregateFplEntryBehaviourProfile = {
    _count: FplEntryBehaviourProfileCountAggregateOutputType | null
    _avg: FplEntryBehaviourProfileAvgAggregateOutputType | null
    _sum: FplEntryBehaviourProfileSumAggregateOutputType | null
    _min: FplEntryBehaviourProfileMinAggregateOutputType | null
    _max: FplEntryBehaviourProfileMaxAggregateOutputType | null
  }

  export type FplEntryBehaviourProfileAvgAggregateOutputType = {
    entryId: number | null
    transfersCount: number | null
    hitsCount: number | null
    totalHitCost: number | null
    avgTransfersPerGw: number | null
    hitRate: number | null
  }

  export type FplEntryBehaviourProfileSumAggregateOutputType = {
    entryId: number | null
    transfersCount: number | null
    hitsCount: number | null
    totalHitCost: number | null
    avgTransfersPerGw: number | null
    hitRate: number | null
  }

  export type FplEntryBehaviourProfileMinAggregateOutputType = {
    entryId: number | null
    transfersCount: number | null
    hitsCount: number | null
    totalHitCost: number | null
    avgTransfersPerGw: number | null
    hitRate: number | null
    lastTransferAt: Date | null
    updatedAt: Date | null
  }

  export type FplEntryBehaviourProfileMaxAggregateOutputType = {
    entryId: number | null
    transfersCount: number | null
    hitsCount: number | null
    totalHitCost: number | null
    avgTransfersPerGw: number | null
    hitRate: number | null
    lastTransferAt: Date | null
    updatedAt: Date | null
  }

  export type FplEntryBehaviourProfileCountAggregateOutputType = {
    entryId: number
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt: number
    updatedAt: number
    _all: number
  }


  export type FplEntryBehaviourProfileAvgAggregateInputType = {
    entryId?: true
    transfersCount?: true
    hitsCount?: true
    totalHitCost?: true
    avgTransfersPerGw?: true
    hitRate?: true
  }

  export type FplEntryBehaviourProfileSumAggregateInputType = {
    entryId?: true
    transfersCount?: true
    hitsCount?: true
    totalHitCost?: true
    avgTransfersPerGw?: true
    hitRate?: true
  }

  export type FplEntryBehaviourProfileMinAggregateInputType = {
    entryId?: true
    transfersCount?: true
    hitsCount?: true
    totalHitCost?: true
    avgTransfersPerGw?: true
    hitRate?: true
    lastTransferAt?: true
    updatedAt?: true
  }

  export type FplEntryBehaviourProfileMaxAggregateInputType = {
    entryId?: true
    transfersCount?: true
    hitsCount?: true
    totalHitCost?: true
    avgTransfersPerGw?: true
    hitRate?: true
    lastTransferAt?: true
    updatedAt?: true
  }

  export type FplEntryBehaviourProfileCountAggregateInputType = {
    entryId?: true
    transfersCount?: true
    hitsCount?: true
    totalHitCost?: true
    avgTransfersPerGw?: true
    hitRate?: true
    lastTransferAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FplEntryBehaviourProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntryBehaviourProfile to aggregate.
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryBehaviourProfiles to fetch.
     */
    orderBy?: FplEntryBehaviourProfileOrderByWithRelationInput | FplEntryBehaviourProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplEntryBehaviourProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryBehaviourProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryBehaviourProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplEntryBehaviourProfiles
    **/
    _count?: true | FplEntryBehaviourProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplEntryBehaviourProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplEntryBehaviourProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplEntryBehaviourProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplEntryBehaviourProfileMaxAggregateInputType
  }

  export type GetFplEntryBehaviourProfileAggregateType<T extends FplEntryBehaviourProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateFplEntryBehaviourProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplEntryBehaviourProfile[P]>
      : GetScalarType<T[P], AggregateFplEntryBehaviourProfile[P]>
  }




  export type FplEntryBehaviourProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplEntryBehaviourProfileWhereInput
    orderBy?: FplEntryBehaviourProfileOrderByWithAggregationInput | FplEntryBehaviourProfileOrderByWithAggregationInput[]
    by: FplEntryBehaviourProfileScalarFieldEnum[] | FplEntryBehaviourProfileScalarFieldEnum
    having?: FplEntryBehaviourProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplEntryBehaviourProfileCountAggregateInputType | true
    _avg?: FplEntryBehaviourProfileAvgAggregateInputType
    _sum?: FplEntryBehaviourProfileSumAggregateInputType
    _min?: FplEntryBehaviourProfileMinAggregateInputType
    _max?: FplEntryBehaviourProfileMaxAggregateInputType
  }

  export type FplEntryBehaviourProfileGroupByOutputType = {
    entryId: number
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt: Date | null
    updatedAt: Date
    _count: FplEntryBehaviourProfileCountAggregateOutputType | null
    _avg: FplEntryBehaviourProfileAvgAggregateOutputType | null
    _sum: FplEntryBehaviourProfileSumAggregateOutputType | null
    _min: FplEntryBehaviourProfileMinAggregateOutputType | null
    _max: FplEntryBehaviourProfileMaxAggregateOutputType | null
  }

  type GetFplEntryBehaviourProfileGroupByPayload<T extends FplEntryBehaviourProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplEntryBehaviourProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplEntryBehaviourProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplEntryBehaviourProfileGroupByOutputType[P]>
            : GetScalarType<T[P], FplEntryBehaviourProfileGroupByOutputType[P]>
        }
      >
    >


  export type FplEntryBehaviourProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    entryId?: boolean
    transfersCount?: boolean
    hitsCount?: boolean
    totalHitCost?: boolean
    avgTransfersPerGw?: boolean
    hitRate?: boolean
    lastTransferAt?: boolean
    updatedAt?: boolean
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryBehaviourProfile"]>

  export type FplEntryBehaviourProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    entryId?: boolean
    transfersCount?: boolean
    hitsCount?: boolean
    totalHitCost?: boolean
    avgTransfersPerGw?: boolean
    hitRate?: boolean
    lastTransferAt?: boolean
    updatedAt?: boolean
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryBehaviourProfile"]>

  export type FplEntryBehaviourProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    entryId?: boolean
    transfersCount?: boolean
    hitsCount?: boolean
    totalHitCost?: boolean
    avgTransfersPerGw?: boolean
    hitRate?: boolean
    lastTransferAt?: boolean
    updatedAt?: boolean
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fplEntryBehaviourProfile"]>

  export type FplEntryBehaviourProfileSelectScalar = {
    entryId?: boolean
    transfersCount?: boolean
    hitsCount?: boolean
    totalHitCost?: boolean
    avgTransfersPerGw?: boolean
    hitRate?: boolean
    lastTransferAt?: boolean
    updatedAt?: boolean
  }

  export type FplEntryBehaviourProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"entryId" | "transfersCount" | "hitsCount" | "totalHitCost" | "avgTransfersPerGw" | "hitRate" | "lastTransferAt" | "updatedAt", ExtArgs["result"]["fplEntryBehaviourProfile"]>
  export type FplEntryBehaviourProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
  }
  export type FplEntryBehaviourProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
  }
  export type FplEntryBehaviourProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FplLeagueEntryDefaultArgs<ExtArgs>
  }

  export type $FplEntryBehaviourProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplEntryBehaviourProfile"
    objects: {
      entry: Prisma.$FplLeagueEntryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      entryId: number
      transfersCount: number
      hitsCount: number
      totalHitCost: number
      avgTransfersPerGw: number
      hitRate: number
      lastTransferAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["fplEntryBehaviourProfile"]>
    composites: {}
  }

  type FplEntryBehaviourProfileGetPayload<S extends boolean | null | undefined | FplEntryBehaviourProfileDefaultArgs> = $Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload, S>

  type FplEntryBehaviourProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplEntryBehaviourProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplEntryBehaviourProfileCountAggregateInputType | true
    }

  export interface FplEntryBehaviourProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplEntryBehaviourProfile'], meta: { name: 'FplEntryBehaviourProfile' } }
    /**
     * Find zero or one FplEntryBehaviourProfile that matches the filter.
     * @param {FplEntryBehaviourProfileFindUniqueArgs} args - Arguments to find a FplEntryBehaviourProfile
     * @example
     * // Get one FplEntryBehaviourProfile
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplEntryBehaviourProfileFindUniqueArgs>(args: SelectSubset<T, FplEntryBehaviourProfileFindUniqueArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplEntryBehaviourProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplEntryBehaviourProfileFindUniqueOrThrowArgs} args - Arguments to find a FplEntryBehaviourProfile
     * @example
     * // Get one FplEntryBehaviourProfile
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplEntryBehaviourProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, FplEntryBehaviourProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntryBehaviourProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileFindFirstArgs} args - Arguments to find a FplEntryBehaviourProfile
     * @example
     * // Get one FplEntryBehaviourProfile
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplEntryBehaviourProfileFindFirstArgs>(args?: SelectSubset<T, FplEntryBehaviourProfileFindFirstArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplEntryBehaviourProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileFindFirstOrThrowArgs} args - Arguments to find a FplEntryBehaviourProfile
     * @example
     * // Get one FplEntryBehaviourProfile
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplEntryBehaviourProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, FplEntryBehaviourProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplEntryBehaviourProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplEntryBehaviourProfiles
     * const fplEntryBehaviourProfiles = await prisma.fplEntryBehaviourProfile.findMany()
     * 
     * // Get first 10 FplEntryBehaviourProfiles
     * const fplEntryBehaviourProfiles = await prisma.fplEntryBehaviourProfile.findMany({ take: 10 })
     * 
     * // Only select the `entryId`
     * const fplEntryBehaviourProfileWithEntryIdOnly = await prisma.fplEntryBehaviourProfile.findMany({ select: { entryId: true } })
     * 
     */
    findMany<T extends FplEntryBehaviourProfileFindManyArgs>(args?: SelectSubset<T, FplEntryBehaviourProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplEntryBehaviourProfile.
     * @param {FplEntryBehaviourProfileCreateArgs} args - Arguments to create a FplEntryBehaviourProfile.
     * @example
     * // Create one FplEntryBehaviourProfile
     * const FplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.create({
     *   data: {
     *     // ... data to create a FplEntryBehaviourProfile
     *   }
     * })
     * 
     */
    create<T extends FplEntryBehaviourProfileCreateArgs>(args: SelectSubset<T, FplEntryBehaviourProfileCreateArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplEntryBehaviourProfiles.
     * @param {FplEntryBehaviourProfileCreateManyArgs} args - Arguments to create many FplEntryBehaviourProfiles.
     * @example
     * // Create many FplEntryBehaviourProfiles
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplEntryBehaviourProfileCreateManyArgs>(args?: SelectSubset<T, FplEntryBehaviourProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplEntryBehaviourProfiles and returns the data saved in the database.
     * @param {FplEntryBehaviourProfileCreateManyAndReturnArgs} args - Arguments to create many FplEntryBehaviourProfiles.
     * @example
     * // Create many FplEntryBehaviourProfiles
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplEntryBehaviourProfiles and only return the `entryId`
     * const fplEntryBehaviourProfileWithEntryIdOnly = await prisma.fplEntryBehaviourProfile.createManyAndReturn({
     *   select: { entryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplEntryBehaviourProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, FplEntryBehaviourProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplEntryBehaviourProfile.
     * @param {FplEntryBehaviourProfileDeleteArgs} args - Arguments to delete one FplEntryBehaviourProfile.
     * @example
     * // Delete one FplEntryBehaviourProfile
     * const FplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.delete({
     *   where: {
     *     // ... filter to delete one FplEntryBehaviourProfile
     *   }
     * })
     * 
     */
    delete<T extends FplEntryBehaviourProfileDeleteArgs>(args: SelectSubset<T, FplEntryBehaviourProfileDeleteArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplEntryBehaviourProfile.
     * @param {FplEntryBehaviourProfileUpdateArgs} args - Arguments to update one FplEntryBehaviourProfile.
     * @example
     * // Update one FplEntryBehaviourProfile
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplEntryBehaviourProfileUpdateArgs>(args: SelectSubset<T, FplEntryBehaviourProfileUpdateArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplEntryBehaviourProfiles.
     * @param {FplEntryBehaviourProfileDeleteManyArgs} args - Arguments to filter FplEntryBehaviourProfiles to delete.
     * @example
     * // Delete a few FplEntryBehaviourProfiles
     * const { count } = await prisma.fplEntryBehaviourProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplEntryBehaviourProfileDeleteManyArgs>(args?: SelectSubset<T, FplEntryBehaviourProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntryBehaviourProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplEntryBehaviourProfiles
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplEntryBehaviourProfileUpdateManyArgs>(args: SelectSubset<T, FplEntryBehaviourProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplEntryBehaviourProfiles and returns the data updated in the database.
     * @param {FplEntryBehaviourProfileUpdateManyAndReturnArgs} args - Arguments to update many FplEntryBehaviourProfiles.
     * @example
     * // Update many FplEntryBehaviourProfiles
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplEntryBehaviourProfiles and only return the `entryId`
     * const fplEntryBehaviourProfileWithEntryIdOnly = await prisma.fplEntryBehaviourProfile.updateManyAndReturn({
     *   select: { entryId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplEntryBehaviourProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, FplEntryBehaviourProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplEntryBehaviourProfile.
     * @param {FplEntryBehaviourProfileUpsertArgs} args - Arguments to update or create a FplEntryBehaviourProfile.
     * @example
     * // Update or create a FplEntryBehaviourProfile
     * const fplEntryBehaviourProfile = await prisma.fplEntryBehaviourProfile.upsert({
     *   create: {
     *     // ... data to create a FplEntryBehaviourProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplEntryBehaviourProfile we want to update
     *   }
     * })
     */
    upsert<T extends FplEntryBehaviourProfileUpsertArgs>(args: SelectSubset<T, FplEntryBehaviourProfileUpsertArgs<ExtArgs>>): Prisma__FplEntryBehaviourProfileClient<$Result.GetResult<Prisma.$FplEntryBehaviourProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplEntryBehaviourProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileCountArgs} args - Arguments to filter FplEntryBehaviourProfiles to count.
     * @example
     * // Count the number of FplEntryBehaviourProfiles
     * const count = await prisma.fplEntryBehaviourProfile.count({
     *   where: {
     *     // ... the filter for the FplEntryBehaviourProfiles we want to count
     *   }
     * })
    **/
    count<T extends FplEntryBehaviourProfileCountArgs>(
      args?: Subset<T, FplEntryBehaviourProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplEntryBehaviourProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplEntryBehaviourProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplEntryBehaviourProfileAggregateArgs>(args: Subset<T, FplEntryBehaviourProfileAggregateArgs>): Prisma.PrismaPromise<GetFplEntryBehaviourProfileAggregateType<T>>

    /**
     * Group by FplEntryBehaviourProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplEntryBehaviourProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplEntryBehaviourProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplEntryBehaviourProfileGroupByArgs['orderBy'] }
        : { orderBy?: FplEntryBehaviourProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplEntryBehaviourProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplEntryBehaviourProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplEntryBehaviourProfile model
   */
  readonly fields: FplEntryBehaviourProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplEntryBehaviourProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplEntryBehaviourProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends FplLeagueEntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FplLeagueEntryDefaultArgs<ExtArgs>>): Prisma__FplLeagueEntryClient<$Result.GetResult<Prisma.$FplLeagueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplEntryBehaviourProfile model
   */
  interface FplEntryBehaviourProfileFieldRefs {
    readonly entryId: FieldRef<"FplEntryBehaviourProfile", 'Int'>
    readonly transfersCount: FieldRef<"FplEntryBehaviourProfile", 'Int'>
    readonly hitsCount: FieldRef<"FplEntryBehaviourProfile", 'Int'>
    readonly totalHitCost: FieldRef<"FplEntryBehaviourProfile", 'Int'>
    readonly avgTransfersPerGw: FieldRef<"FplEntryBehaviourProfile", 'Float'>
    readonly hitRate: FieldRef<"FplEntryBehaviourProfile", 'Float'>
    readonly lastTransferAt: FieldRef<"FplEntryBehaviourProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"FplEntryBehaviourProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FplEntryBehaviourProfile findUnique
   */
  export type FplEntryBehaviourProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryBehaviourProfile to fetch.
     */
    where: FplEntryBehaviourProfileWhereUniqueInput
  }

  /**
   * FplEntryBehaviourProfile findUniqueOrThrow
   */
  export type FplEntryBehaviourProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryBehaviourProfile to fetch.
     */
    where: FplEntryBehaviourProfileWhereUniqueInput
  }

  /**
   * FplEntryBehaviourProfile findFirst
   */
  export type FplEntryBehaviourProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryBehaviourProfile to fetch.
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryBehaviourProfiles to fetch.
     */
    orderBy?: FplEntryBehaviourProfileOrderByWithRelationInput | FplEntryBehaviourProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntryBehaviourProfiles.
     */
    cursor?: FplEntryBehaviourProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryBehaviourProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryBehaviourProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntryBehaviourProfiles.
     */
    distinct?: FplEntryBehaviourProfileScalarFieldEnum | FplEntryBehaviourProfileScalarFieldEnum[]
  }

  /**
   * FplEntryBehaviourProfile findFirstOrThrow
   */
  export type FplEntryBehaviourProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryBehaviourProfile to fetch.
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryBehaviourProfiles to fetch.
     */
    orderBy?: FplEntryBehaviourProfileOrderByWithRelationInput | FplEntryBehaviourProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplEntryBehaviourProfiles.
     */
    cursor?: FplEntryBehaviourProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryBehaviourProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryBehaviourProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplEntryBehaviourProfiles.
     */
    distinct?: FplEntryBehaviourProfileScalarFieldEnum | FplEntryBehaviourProfileScalarFieldEnum[]
  }

  /**
   * FplEntryBehaviourProfile findMany
   */
  export type FplEntryBehaviourProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * Filter, which FplEntryBehaviourProfiles to fetch.
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplEntryBehaviourProfiles to fetch.
     */
    orderBy?: FplEntryBehaviourProfileOrderByWithRelationInput | FplEntryBehaviourProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplEntryBehaviourProfiles.
     */
    cursor?: FplEntryBehaviourProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplEntryBehaviourProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplEntryBehaviourProfiles.
     */
    skip?: number
    distinct?: FplEntryBehaviourProfileScalarFieldEnum | FplEntryBehaviourProfileScalarFieldEnum[]
  }

  /**
   * FplEntryBehaviourProfile create
   */
  export type FplEntryBehaviourProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a FplEntryBehaviourProfile.
     */
    data: XOR<FplEntryBehaviourProfileCreateInput, FplEntryBehaviourProfileUncheckedCreateInput>
  }

  /**
   * FplEntryBehaviourProfile createMany
   */
  export type FplEntryBehaviourProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplEntryBehaviourProfiles.
     */
    data: FplEntryBehaviourProfileCreateManyInput | FplEntryBehaviourProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplEntryBehaviourProfile createManyAndReturn
   */
  export type FplEntryBehaviourProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * The data used to create many FplEntryBehaviourProfiles.
     */
    data: FplEntryBehaviourProfileCreateManyInput | FplEntryBehaviourProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntryBehaviourProfile update
   */
  export type FplEntryBehaviourProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a FplEntryBehaviourProfile.
     */
    data: XOR<FplEntryBehaviourProfileUpdateInput, FplEntryBehaviourProfileUncheckedUpdateInput>
    /**
     * Choose, which FplEntryBehaviourProfile to update.
     */
    where: FplEntryBehaviourProfileWhereUniqueInput
  }

  /**
   * FplEntryBehaviourProfile updateMany
   */
  export type FplEntryBehaviourProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplEntryBehaviourProfiles.
     */
    data: XOR<FplEntryBehaviourProfileUpdateManyMutationInput, FplEntryBehaviourProfileUncheckedUpdateManyInput>
    /**
     * Filter which FplEntryBehaviourProfiles to update
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * Limit how many FplEntryBehaviourProfiles to update.
     */
    limit?: number
  }

  /**
   * FplEntryBehaviourProfile updateManyAndReturn
   */
  export type FplEntryBehaviourProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * The data used to update FplEntryBehaviourProfiles.
     */
    data: XOR<FplEntryBehaviourProfileUpdateManyMutationInput, FplEntryBehaviourProfileUncheckedUpdateManyInput>
    /**
     * Filter which FplEntryBehaviourProfiles to update
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * Limit how many FplEntryBehaviourProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FplEntryBehaviourProfile upsert
   */
  export type FplEntryBehaviourProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the FplEntryBehaviourProfile to update in case it exists.
     */
    where: FplEntryBehaviourProfileWhereUniqueInput
    /**
     * In case the FplEntryBehaviourProfile found by the `where` argument doesn't exist, create a new FplEntryBehaviourProfile with this data.
     */
    create: XOR<FplEntryBehaviourProfileCreateInput, FplEntryBehaviourProfileUncheckedCreateInput>
    /**
     * In case the FplEntryBehaviourProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplEntryBehaviourProfileUpdateInput, FplEntryBehaviourProfileUncheckedUpdateInput>
  }

  /**
   * FplEntryBehaviourProfile delete
   */
  export type FplEntryBehaviourProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
    /**
     * Filter which FplEntryBehaviourProfile to delete.
     */
    where: FplEntryBehaviourProfileWhereUniqueInput
  }

  /**
   * FplEntryBehaviourProfile deleteMany
   */
  export type FplEntryBehaviourProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplEntryBehaviourProfiles to delete
     */
    where?: FplEntryBehaviourProfileWhereInput
    /**
     * Limit how many FplEntryBehaviourProfiles to delete.
     */
    limit?: number
  }

  /**
   * FplEntryBehaviourProfile without action
   */
  export type FplEntryBehaviourProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplEntryBehaviourProfile
     */
    select?: FplEntryBehaviourProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplEntryBehaviourProfile
     */
    omit?: FplEntryBehaviourProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FplEntryBehaviourProfileInclude<ExtArgs> | null
  }


  /**
   * Model FplFixture
   */

  export type AggregateFplFixture = {
    _count: FplFixtureCountAggregateOutputType | null
    _avg: FplFixtureAvgAggregateOutputType | null
    _sum: FplFixtureSumAggregateOutputType | null
    _min: FplFixtureMinAggregateOutputType | null
    _max: FplFixtureMaxAggregateOutputType | null
  }

  export type FplFixtureAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
    teamHId: number | null
    teamAId: number | null
    teamHDifficulty: number | null
    teamADifficulty: number | null
  }

  export type FplFixtureSumAggregateOutputType = {
    id: number | null
    eventId: number | null
    teamHId: number | null
    teamAId: number | null
    teamHDifficulty: number | null
    teamADifficulty: number | null
  }

  export type FplFixtureMinAggregateOutputType = {
    id: number | null
    eventId: number | null
    teamHId: number | null
    teamAId: number | null
    teamHDifficulty: number | null
    teamADifficulty: number | null
    kickoffTime: Date | null
    finished: boolean | null
  }

  export type FplFixtureMaxAggregateOutputType = {
    id: number | null
    eventId: number | null
    teamHId: number | null
    teamAId: number | null
    teamHDifficulty: number | null
    teamADifficulty: number | null
    kickoffTime: Date | null
    finished: boolean | null
  }

  export type FplFixtureCountAggregateOutputType = {
    id: number
    eventId: number
    teamHId: number
    teamAId: number
    teamHDifficulty: number
    teamADifficulty: number
    kickoffTime: number
    finished: number
    _all: number
  }


  export type FplFixtureAvgAggregateInputType = {
    id?: true
    eventId?: true
    teamHId?: true
    teamAId?: true
    teamHDifficulty?: true
    teamADifficulty?: true
  }

  export type FplFixtureSumAggregateInputType = {
    id?: true
    eventId?: true
    teamHId?: true
    teamAId?: true
    teamHDifficulty?: true
    teamADifficulty?: true
  }

  export type FplFixtureMinAggregateInputType = {
    id?: true
    eventId?: true
    teamHId?: true
    teamAId?: true
    teamHDifficulty?: true
    teamADifficulty?: true
    kickoffTime?: true
    finished?: true
  }

  export type FplFixtureMaxAggregateInputType = {
    id?: true
    eventId?: true
    teamHId?: true
    teamAId?: true
    teamHDifficulty?: true
    teamADifficulty?: true
    kickoffTime?: true
    finished?: true
  }

  export type FplFixtureCountAggregateInputType = {
    id?: true
    eventId?: true
    teamHId?: true
    teamAId?: true
    teamHDifficulty?: true
    teamADifficulty?: true
    kickoffTime?: true
    finished?: true
    _all?: true
  }

  export type FplFixtureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplFixture to aggregate.
     */
    where?: FplFixtureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplFixtures to fetch.
     */
    orderBy?: FplFixtureOrderByWithRelationInput | FplFixtureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FplFixtureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplFixtures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplFixtures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FplFixtures
    **/
    _count?: true | FplFixtureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FplFixtureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FplFixtureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FplFixtureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FplFixtureMaxAggregateInputType
  }

  export type GetFplFixtureAggregateType<T extends FplFixtureAggregateArgs> = {
        [P in keyof T & keyof AggregateFplFixture]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFplFixture[P]>
      : GetScalarType<T[P], AggregateFplFixture[P]>
  }




  export type FplFixtureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FplFixtureWhereInput
    orderBy?: FplFixtureOrderByWithAggregationInput | FplFixtureOrderByWithAggregationInput[]
    by: FplFixtureScalarFieldEnum[] | FplFixtureScalarFieldEnum
    having?: FplFixtureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FplFixtureCountAggregateInputType | true
    _avg?: FplFixtureAvgAggregateInputType
    _sum?: FplFixtureSumAggregateInputType
    _min?: FplFixtureMinAggregateInputType
    _max?: FplFixtureMaxAggregateInputType
  }

  export type FplFixtureGroupByOutputType = {
    id: number
    eventId: number | null
    teamHId: number
    teamAId: number
    teamHDifficulty: number
    teamADifficulty: number
    kickoffTime: Date | null
    finished: boolean
    _count: FplFixtureCountAggregateOutputType | null
    _avg: FplFixtureAvgAggregateOutputType | null
    _sum: FplFixtureSumAggregateOutputType | null
    _min: FplFixtureMinAggregateOutputType | null
    _max: FplFixtureMaxAggregateOutputType | null
  }

  type GetFplFixtureGroupByPayload<T extends FplFixtureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FplFixtureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FplFixtureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FplFixtureGroupByOutputType[P]>
            : GetScalarType<T[P], FplFixtureGroupByOutputType[P]>
        }
      >
    >


  export type FplFixtureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    teamHId?: boolean
    teamAId?: boolean
    teamHDifficulty?: boolean
    teamADifficulty?: boolean
    kickoffTime?: boolean
    finished?: boolean
  }, ExtArgs["result"]["fplFixture"]>

  export type FplFixtureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    teamHId?: boolean
    teamAId?: boolean
    teamHDifficulty?: boolean
    teamADifficulty?: boolean
    kickoffTime?: boolean
    finished?: boolean
  }, ExtArgs["result"]["fplFixture"]>

  export type FplFixtureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    teamHId?: boolean
    teamAId?: boolean
    teamHDifficulty?: boolean
    teamADifficulty?: boolean
    kickoffTime?: boolean
    finished?: boolean
  }, ExtArgs["result"]["fplFixture"]>

  export type FplFixtureSelectScalar = {
    id?: boolean
    eventId?: boolean
    teamHId?: boolean
    teamAId?: boolean
    teamHDifficulty?: boolean
    teamADifficulty?: boolean
    kickoffTime?: boolean
    finished?: boolean
  }

  export type FplFixtureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "teamHId" | "teamAId" | "teamHDifficulty" | "teamADifficulty" | "kickoffTime" | "finished", ExtArgs["result"]["fplFixture"]>

  export type $FplFixturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FplFixture"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      eventId: number | null
      teamHId: number
      teamAId: number
      teamHDifficulty: number
      teamADifficulty: number
      kickoffTime: Date | null
      finished: boolean
    }, ExtArgs["result"]["fplFixture"]>
    composites: {}
  }

  type FplFixtureGetPayload<S extends boolean | null | undefined | FplFixtureDefaultArgs> = $Result.GetResult<Prisma.$FplFixturePayload, S>

  type FplFixtureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FplFixtureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FplFixtureCountAggregateInputType | true
    }

  export interface FplFixtureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FplFixture'], meta: { name: 'FplFixture' } }
    /**
     * Find zero or one FplFixture that matches the filter.
     * @param {FplFixtureFindUniqueArgs} args - Arguments to find a FplFixture
     * @example
     * // Get one FplFixture
     * const fplFixture = await prisma.fplFixture.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FplFixtureFindUniqueArgs>(args: SelectSubset<T, FplFixtureFindUniqueArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FplFixture that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FplFixtureFindUniqueOrThrowArgs} args - Arguments to find a FplFixture
     * @example
     * // Get one FplFixture
     * const fplFixture = await prisma.fplFixture.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FplFixtureFindUniqueOrThrowArgs>(args: SelectSubset<T, FplFixtureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplFixture that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureFindFirstArgs} args - Arguments to find a FplFixture
     * @example
     * // Get one FplFixture
     * const fplFixture = await prisma.fplFixture.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FplFixtureFindFirstArgs>(args?: SelectSubset<T, FplFixtureFindFirstArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FplFixture that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureFindFirstOrThrowArgs} args - Arguments to find a FplFixture
     * @example
     * // Get one FplFixture
     * const fplFixture = await prisma.fplFixture.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FplFixtureFindFirstOrThrowArgs>(args?: SelectSubset<T, FplFixtureFindFirstOrThrowArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FplFixtures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FplFixtures
     * const fplFixtures = await prisma.fplFixture.findMany()
     * 
     * // Get first 10 FplFixtures
     * const fplFixtures = await prisma.fplFixture.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fplFixtureWithIdOnly = await prisma.fplFixture.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FplFixtureFindManyArgs>(args?: SelectSubset<T, FplFixtureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FplFixture.
     * @param {FplFixtureCreateArgs} args - Arguments to create a FplFixture.
     * @example
     * // Create one FplFixture
     * const FplFixture = await prisma.fplFixture.create({
     *   data: {
     *     // ... data to create a FplFixture
     *   }
     * })
     * 
     */
    create<T extends FplFixtureCreateArgs>(args: SelectSubset<T, FplFixtureCreateArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FplFixtures.
     * @param {FplFixtureCreateManyArgs} args - Arguments to create many FplFixtures.
     * @example
     * // Create many FplFixtures
     * const fplFixture = await prisma.fplFixture.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FplFixtureCreateManyArgs>(args?: SelectSubset<T, FplFixtureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FplFixtures and returns the data saved in the database.
     * @param {FplFixtureCreateManyAndReturnArgs} args - Arguments to create many FplFixtures.
     * @example
     * // Create many FplFixtures
     * const fplFixture = await prisma.fplFixture.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FplFixtures and only return the `id`
     * const fplFixtureWithIdOnly = await prisma.fplFixture.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FplFixtureCreateManyAndReturnArgs>(args?: SelectSubset<T, FplFixtureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FplFixture.
     * @param {FplFixtureDeleteArgs} args - Arguments to delete one FplFixture.
     * @example
     * // Delete one FplFixture
     * const FplFixture = await prisma.fplFixture.delete({
     *   where: {
     *     // ... filter to delete one FplFixture
     *   }
     * })
     * 
     */
    delete<T extends FplFixtureDeleteArgs>(args: SelectSubset<T, FplFixtureDeleteArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FplFixture.
     * @param {FplFixtureUpdateArgs} args - Arguments to update one FplFixture.
     * @example
     * // Update one FplFixture
     * const fplFixture = await prisma.fplFixture.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FplFixtureUpdateArgs>(args: SelectSubset<T, FplFixtureUpdateArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FplFixtures.
     * @param {FplFixtureDeleteManyArgs} args - Arguments to filter FplFixtures to delete.
     * @example
     * // Delete a few FplFixtures
     * const { count } = await prisma.fplFixture.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FplFixtureDeleteManyArgs>(args?: SelectSubset<T, FplFixtureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplFixtures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FplFixtures
     * const fplFixture = await prisma.fplFixture.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FplFixtureUpdateManyArgs>(args: SelectSubset<T, FplFixtureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FplFixtures and returns the data updated in the database.
     * @param {FplFixtureUpdateManyAndReturnArgs} args - Arguments to update many FplFixtures.
     * @example
     * // Update many FplFixtures
     * const fplFixture = await prisma.fplFixture.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FplFixtures and only return the `id`
     * const fplFixtureWithIdOnly = await prisma.fplFixture.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FplFixtureUpdateManyAndReturnArgs>(args: SelectSubset<T, FplFixtureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FplFixture.
     * @param {FplFixtureUpsertArgs} args - Arguments to update or create a FplFixture.
     * @example
     * // Update or create a FplFixture
     * const fplFixture = await prisma.fplFixture.upsert({
     *   create: {
     *     // ... data to create a FplFixture
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FplFixture we want to update
     *   }
     * })
     */
    upsert<T extends FplFixtureUpsertArgs>(args: SelectSubset<T, FplFixtureUpsertArgs<ExtArgs>>): Prisma__FplFixtureClient<$Result.GetResult<Prisma.$FplFixturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FplFixtures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureCountArgs} args - Arguments to filter FplFixtures to count.
     * @example
     * // Count the number of FplFixtures
     * const count = await prisma.fplFixture.count({
     *   where: {
     *     // ... the filter for the FplFixtures we want to count
     *   }
     * })
    **/
    count<T extends FplFixtureCountArgs>(
      args?: Subset<T, FplFixtureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FplFixtureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FplFixture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FplFixtureAggregateArgs>(args: Subset<T, FplFixtureAggregateArgs>): Prisma.PrismaPromise<GetFplFixtureAggregateType<T>>

    /**
     * Group by FplFixture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FplFixtureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FplFixtureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FplFixtureGroupByArgs['orderBy'] }
        : { orderBy?: FplFixtureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FplFixtureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFplFixtureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FplFixture model
   */
  readonly fields: FplFixtureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FplFixture.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FplFixtureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FplFixture model
   */
  interface FplFixtureFieldRefs {
    readonly id: FieldRef<"FplFixture", 'Int'>
    readonly eventId: FieldRef<"FplFixture", 'Int'>
    readonly teamHId: FieldRef<"FplFixture", 'Int'>
    readonly teamAId: FieldRef<"FplFixture", 'Int'>
    readonly teamHDifficulty: FieldRef<"FplFixture", 'Int'>
    readonly teamADifficulty: FieldRef<"FplFixture", 'Int'>
    readonly kickoffTime: FieldRef<"FplFixture", 'DateTime'>
    readonly finished: FieldRef<"FplFixture", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * FplFixture findUnique
   */
  export type FplFixtureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * Filter, which FplFixture to fetch.
     */
    where: FplFixtureWhereUniqueInput
  }

  /**
   * FplFixture findUniqueOrThrow
   */
  export type FplFixtureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * Filter, which FplFixture to fetch.
     */
    where: FplFixtureWhereUniqueInput
  }

  /**
   * FplFixture findFirst
   */
  export type FplFixtureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * Filter, which FplFixture to fetch.
     */
    where?: FplFixtureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplFixtures to fetch.
     */
    orderBy?: FplFixtureOrderByWithRelationInput | FplFixtureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplFixtures.
     */
    cursor?: FplFixtureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplFixtures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplFixtures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplFixtures.
     */
    distinct?: FplFixtureScalarFieldEnum | FplFixtureScalarFieldEnum[]
  }

  /**
   * FplFixture findFirstOrThrow
   */
  export type FplFixtureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * Filter, which FplFixture to fetch.
     */
    where?: FplFixtureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplFixtures to fetch.
     */
    orderBy?: FplFixtureOrderByWithRelationInput | FplFixtureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FplFixtures.
     */
    cursor?: FplFixtureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplFixtures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplFixtures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FplFixtures.
     */
    distinct?: FplFixtureScalarFieldEnum | FplFixtureScalarFieldEnum[]
  }

  /**
   * FplFixture findMany
   */
  export type FplFixtureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * Filter, which FplFixtures to fetch.
     */
    where?: FplFixtureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FplFixtures to fetch.
     */
    orderBy?: FplFixtureOrderByWithRelationInput | FplFixtureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FplFixtures.
     */
    cursor?: FplFixtureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FplFixtures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FplFixtures.
     */
    skip?: number
    distinct?: FplFixtureScalarFieldEnum | FplFixtureScalarFieldEnum[]
  }

  /**
   * FplFixture create
   */
  export type FplFixtureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * The data needed to create a FplFixture.
     */
    data: XOR<FplFixtureCreateInput, FplFixtureUncheckedCreateInput>
  }

  /**
   * FplFixture createMany
   */
  export type FplFixtureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FplFixtures.
     */
    data: FplFixtureCreateManyInput | FplFixtureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplFixture createManyAndReturn
   */
  export type FplFixtureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * The data used to create many FplFixtures.
     */
    data: FplFixtureCreateManyInput | FplFixtureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FplFixture update
   */
  export type FplFixtureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * The data needed to update a FplFixture.
     */
    data: XOR<FplFixtureUpdateInput, FplFixtureUncheckedUpdateInput>
    /**
     * Choose, which FplFixture to update.
     */
    where: FplFixtureWhereUniqueInput
  }

  /**
   * FplFixture updateMany
   */
  export type FplFixtureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FplFixtures.
     */
    data: XOR<FplFixtureUpdateManyMutationInput, FplFixtureUncheckedUpdateManyInput>
    /**
     * Filter which FplFixtures to update
     */
    where?: FplFixtureWhereInput
    /**
     * Limit how many FplFixtures to update.
     */
    limit?: number
  }

  /**
   * FplFixture updateManyAndReturn
   */
  export type FplFixtureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * The data used to update FplFixtures.
     */
    data: XOR<FplFixtureUpdateManyMutationInput, FplFixtureUncheckedUpdateManyInput>
    /**
     * Filter which FplFixtures to update
     */
    where?: FplFixtureWhereInput
    /**
     * Limit how many FplFixtures to update.
     */
    limit?: number
  }

  /**
   * FplFixture upsert
   */
  export type FplFixtureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * The filter to search for the FplFixture to update in case it exists.
     */
    where: FplFixtureWhereUniqueInput
    /**
     * In case the FplFixture found by the `where` argument doesn't exist, create a new FplFixture with this data.
     */
    create: XOR<FplFixtureCreateInput, FplFixtureUncheckedCreateInput>
    /**
     * In case the FplFixture was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FplFixtureUpdateInput, FplFixtureUncheckedUpdateInput>
  }

  /**
   * FplFixture delete
   */
  export type FplFixtureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
    /**
     * Filter which FplFixture to delete.
     */
    where: FplFixtureWhereUniqueInput
  }

  /**
   * FplFixture deleteMany
   */
  export type FplFixtureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FplFixtures to delete
     */
    where?: FplFixtureWhereInput
    /**
     * Limit how many FplFixtures to delete.
     */
    limit?: number
  }

  /**
   * FplFixture without action
   */
  export type FplFixtureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FplFixture
     */
    select?: FplFixtureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FplFixture
     */
    omit?: FplFixtureOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FplBootstrapSnapshotScalarFieldEnum: {
    id: 'id',
    fetchedAt: 'fetchedAt',
    source: 'source',
    hash: 'hash',
    teamsCount: 'teamsCount',
    playersCount: 'playersCount',
    positionsCount: 'positionsCount',
    gameweeksCount: 'gameweeksCount'
  };

  export type FplBootstrapSnapshotScalarFieldEnum = (typeof FplBootstrapSnapshotScalarFieldEnum)[keyof typeof FplBootstrapSnapshotScalarFieldEnum]


  export const FplTeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    shortName: 'shortName',
    code: 'code',
    updatedAt: 'updatedAt'
  };

  export type FplTeamScalarFieldEnum = (typeof FplTeamScalarFieldEnum)[keyof typeof FplTeamScalarFieldEnum]


  export const FplPositionScalarFieldEnum: {
    id: 'id',
    shortName: 'shortName',
    updatedAt: 'updatedAt'
  };

  export type FplPositionScalarFieldEnum = (typeof FplPositionScalarFieldEnum)[keyof typeof FplPositionScalarFieldEnum]


  export const FplPlayerScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    positionId: 'positionId',
    firstName: 'firstName',
    secondName: 'secondName',
    webName: 'webName',
    nowCost: 'nowCost',
    status: 'status',
    news: 'news',
    selectedByPercent: 'selectedByPercent',
    transfersInEvent: 'transfersInEvent',
    transfersOutEvent: 'transfersOutEvent',
    updatedAt: 'updatedAt'
  };

  export type FplPlayerScalarFieldEnum = (typeof FplPlayerScalarFieldEnum)[keyof typeof FplPlayerScalarFieldEnum]


  export const FplGameweekScalarFieldEnum: {
    id: 'id',
    name: 'name',
    deadlineTime: 'deadlineTime',
    finished: 'finished',
    isCurrent: 'isCurrent',
    isNext: 'isNext',
    updatedAt: 'updatedAt'
  };

  export type FplGameweekScalarFieldEnum = (typeof FplGameweekScalarFieldEnum)[keyof typeof FplGameweekScalarFieldEnum]


  export const FplLeagueScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FplLeagueScalarFieldEnum = (typeof FplLeagueScalarFieldEnum)[keyof typeof FplLeagueScalarFieldEnum]


  export const FplLeagueEntryScalarFieldEnum: {
    id: 'id',
    leagueId: 'leagueId',
    entryName: 'entryName',
    playerName: 'playerName',
    rank: 'rank',
    lastRank: 'lastRank',
    totalPoints: 'totalPoints',
    updatedAt: 'updatedAt'
  };

  export type FplLeagueEntryScalarFieldEnum = (typeof FplLeagueEntryScalarFieldEnum)[keyof typeof FplLeagueEntryScalarFieldEnum]


  export const FplEntrySnapshotScalarFieldEnum: {
    id: 'id',
    leagueId: 'leagueId',
    entryId: 'entryId',
    eventId: 'eventId',
    bank: 'bank',
    teamValue: 'teamValue',
    eventTransfers: 'eventTransfers',
    eventTransfersCost: 'eventTransfersCost',
    fetchedAt: 'fetchedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FplEntrySnapshotScalarFieldEnum = (typeof FplEntrySnapshotScalarFieldEnum)[keyof typeof FplEntrySnapshotScalarFieldEnum]


  export const FplEntryPickScalarFieldEnum: {
    id: 'id',
    snapshotId: 'snapshotId',
    playerId: 'playerId',
    pickPosition: 'pickPosition',
    multiplier: 'multiplier',
    isCaptain: 'isCaptain',
    isViceCaptain: 'isViceCaptain'
  };

  export type FplEntryPickScalarFieldEnum = (typeof FplEntryPickScalarFieldEnum)[keyof typeof FplEntryPickScalarFieldEnum]


  export const FplEntryTransferScalarFieldEnum: {
    id: 'id',
    entryId: 'entryId',
    eventId: 'eventId',
    time: 'time',
    playerInId: 'playerInId',
    playerOutId: 'playerOutId',
    value: 'value',
    bank: 'bank',
    cost: 'cost',
    createdAt: 'createdAt'
  };

  export type FplEntryTransferScalarFieldEnum = (typeof FplEntryTransferScalarFieldEnum)[keyof typeof FplEntryTransferScalarFieldEnum]


  export const FplEntryBehaviourProfileScalarFieldEnum: {
    entryId: 'entryId',
    transfersCount: 'transfersCount',
    hitsCount: 'hitsCount',
    totalHitCost: 'totalHitCost',
    avgTransfersPerGw: 'avgTransfersPerGw',
    hitRate: 'hitRate',
    lastTransferAt: 'lastTransferAt',
    updatedAt: 'updatedAt'
  };

  export type FplEntryBehaviourProfileScalarFieldEnum = (typeof FplEntryBehaviourProfileScalarFieldEnum)[keyof typeof FplEntryBehaviourProfileScalarFieldEnum]


  export const FplFixtureScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    teamHId: 'teamHId',
    teamAId: 'teamAId',
    teamHDifficulty: 'teamHDifficulty',
    teamADifficulty: 'teamADifficulty',
    kickoffTime: 'kickoffTime',
    finished: 'finished'
  };

  export type FplFixtureScalarFieldEnum = (typeof FplFixtureScalarFieldEnum)[keyof typeof FplFixtureScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type FplBootstrapSnapshotWhereInput = {
    AND?: FplBootstrapSnapshotWhereInput | FplBootstrapSnapshotWhereInput[]
    OR?: FplBootstrapSnapshotWhereInput[]
    NOT?: FplBootstrapSnapshotWhereInput | FplBootstrapSnapshotWhereInput[]
    id?: StringFilter<"FplBootstrapSnapshot"> | string
    fetchedAt?: DateTimeFilter<"FplBootstrapSnapshot"> | Date | string
    source?: StringFilter<"FplBootstrapSnapshot"> | string
    hash?: StringNullableFilter<"FplBootstrapSnapshot"> | string | null
    teamsCount?: IntFilter<"FplBootstrapSnapshot"> | number
    playersCount?: IntFilter<"FplBootstrapSnapshot"> | number
    positionsCount?: IntFilter<"FplBootstrapSnapshot"> | number
    gameweeksCount?: IntFilter<"FplBootstrapSnapshot"> | number
  }

  export type FplBootstrapSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    source?: SortOrder
    hash?: SortOrderInput | SortOrder
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
  }

  export type FplBootstrapSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FplBootstrapSnapshotWhereInput | FplBootstrapSnapshotWhereInput[]
    OR?: FplBootstrapSnapshotWhereInput[]
    NOT?: FplBootstrapSnapshotWhereInput | FplBootstrapSnapshotWhereInput[]
    fetchedAt?: DateTimeFilter<"FplBootstrapSnapshot"> | Date | string
    source?: StringFilter<"FplBootstrapSnapshot"> | string
    hash?: StringNullableFilter<"FplBootstrapSnapshot"> | string | null
    teamsCount?: IntFilter<"FplBootstrapSnapshot"> | number
    playersCount?: IntFilter<"FplBootstrapSnapshot"> | number
    positionsCount?: IntFilter<"FplBootstrapSnapshot"> | number
    gameweeksCount?: IntFilter<"FplBootstrapSnapshot"> | number
  }, "id">

  export type FplBootstrapSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    source?: SortOrder
    hash?: SortOrderInput | SortOrder
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
    _count?: FplBootstrapSnapshotCountOrderByAggregateInput
    _avg?: FplBootstrapSnapshotAvgOrderByAggregateInput
    _max?: FplBootstrapSnapshotMaxOrderByAggregateInput
    _min?: FplBootstrapSnapshotMinOrderByAggregateInput
    _sum?: FplBootstrapSnapshotSumOrderByAggregateInput
  }

  export type FplBootstrapSnapshotScalarWhereWithAggregatesInput = {
    AND?: FplBootstrapSnapshotScalarWhereWithAggregatesInput | FplBootstrapSnapshotScalarWhereWithAggregatesInput[]
    OR?: FplBootstrapSnapshotScalarWhereWithAggregatesInput[]
    NOT?: FplBootstrapSnapshotScalarWhereWithAggregatesInput | FplBootstrapSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FplBootstrapSnapshot"> | string
    fetchedAt?: DateTimeWithAggregatesFilter<"FplBootstrapSnapshot"> | Date | string
    source?: StringWithAggregatesFilter<"FplBootstrapSnapshot"> | string
    hash?: StringNullableWithAggregatesFilter<"FplBootstrapSnapshot"> | string | null
    teamsCount?: IntWithAggregatesFilter<"FplBootstrapSnapshot"> | number
    playersCount?: IntWithAggregatesFilter<"FplBootstrapSnapshot"> | number
    positionsCount?: IntWithAggregatesFilter<"FplBootstrapSnapshot"> | number
    gameweeksCount?: IntWithAggregatesFilter<"FplBootstrapSnapshot"> | number
  }

  export type FplTeamWhereInput = {
    AND?: FplTeamWhereInput | FplTeamWhereInput[]
    OR?: FplTeamWhereInput[]
    NOT?: FplTeamWhereInput | FplTeamWhereInput[]
    id?: IntFilter<"FplTeam"> | number
    name?: StringFilter<"FplTeam"> | string
    shortName?: StringFilter<"FplTeam"> | string
    code?: IntNullableFilter<"FplTeam"> | number | null
    updatedAt?: DateTimeFilter<"FplTeam"> | Date | string
    players?: FplPlayerListRelationFilter
  }

  export type FplTeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    code?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    players?: FplPlayerOrderByRelationAggregateInput
  }

  export type FplTeamWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplTeamWhereInput | FplTeamWhereInput[]
    OR?: FplTeamWhereInput[]
    NOT?: FplTeamWhereInput | FplTeamWhereInput[]
    name?: StringFilter<"FplTeam"> | string
    shortName?: StringFilter<"FplTeam"> | string
    code?: IntNullableFilter<"FplTeam"> | number | null
    updatedAt?: DateTimeFilter<"FplTeam"> | Date | string
    players?: FplPlayerListRelationFilter
  }, "id">

  export type FplTeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    code?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: FplTeamCountOrderByAggregateInput
    _avg?: FplTeamAvgOrderByAggregateInput
    _max?: FplTeamMaxOrderByAggregateInput
    _min?: FplTeamMinOrderByAggregateInput
    _sum?: FplTeamSumOrderByAggregateInput
  }

  export type FplTeamScalarWhereWithAggregatesInput = {
    AND?: FplTeamScalarWhereWithAggregatesInput | FplTeamScalarWhereWithAggregatesInput[]
    OR?: FplTeamScalarWhereWithAggregatesInput[]
    NOT?: FplTeamScalarWhereWithAggregatesInput | FplTeamScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplTeam"> | number
    name?: StringWithAggregatesFilter<"FplTeam"> | string
    shortName?: StringWithAggregatesFilter<"FplTeam"> | string
    code?: IntNullableWithAggregatesFilter<"FplTeam"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"FplTeam"> | Date | string
  }

  export type FplPositionWhereInput = {
    AND?: FplPositionWhereInput | FplPositionWhereInput[]
    OR?: FplPositionWhereInput[]
    NOT?: FplPositionWhereInput | FplPositionWhereInput[]
    id?: IntFilter<"FplPosition"> | number
    shortName?: StringFilter<"FplPosition"> | string
    updatedAt?: DateTimeFilter<"FplPosition"> | Date | string
    players?: FplPlayerListRelationFilter
  }

  export type FplPositionOrderByWithRelationInput = {
    id?: SortOrder
    shortName?: SortOrder
    updatedAt?: SortOrder
    players?: FplPlayerOrderByRelationAggregateInput
  }

  export type FplPositionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplPositionWhereInput | FplPositionWhereInput[]
    OR?: FplPositionWhereInput[]
    NOT?: FplPositionWhereInput | FplPositionWhereInput[]
    shortName?: StringFilter<"FplPosition"> | string
    updatedAt?: DateTimeFilter<"FplPosition"> | Date | string
    players?: FplPlayerListRelationFilter
  }, "id">

  export type FplPositionOrderByWithAggregationInput = {
    id?: SortOrder
    shortName?: SortOrder
    updatedAt?: SortOrder
    _count?: FplPositionCountOrderByAggregateInput
    _avg?: FplPositionAvgOrderByAggregateInput
    _max?: FplPositionMaxOrderByAggregateInput
    _min?: FplPositionMinOrderByAggregateInput
    _sum?: FplPositionSumOrderByAggregateInput
  }

  export type FplPositionScalarWhereWithAggregatesInput = {
    AND?: FplPositionScalarWhereWithAggregatesInput | FplPositionScalarWhereWithAggregatesInput[]
    OR?: FplPositionScalarWhereWithAggregatesInput[]
    NOT?: FplPositionScalarWhereWithAggregatesInput | FplPositionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplPosition"> | number
    shortName?: StringWithAggregatesFilter<"FplPosition"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"FplPosition"> | Date | string
  }

  export type FplPlayerWhereInput = {
    AND?: FplPlayerWhereInput | FplPlayerWhereInput[]
    OR?: FplPlayerWhereInput[]
    NOT?: FplPlayerWhereInput | FplPlayerWhereInput[]
    id?: IntFilter<"FplPlayer"> | number
    teamId?: IntFilter<"FplPlayer"> | number
    positionId?: IntFilter<"FplPlayer"> | number
    firstName?: StringFilter<"FplPlayer"> | string
    secondName?: StringFilter<"FplPlayer"> | string
    webName?: StringFilter<"FplPlayer"> | string
    nowCost?: IntFilter<"FplPlayer"> | number
    status?: StringFilter<"FplPlayer"> | string
    news?: StringNullableFilter<"FplPlayer"> | string | null
    selectedByPercent?: FloatNullableFilter<"FplPlayer"> | number | null
    transfersInEvent?: IntFilter<"FplPlayer"> | number
    transfersOutEvent?: IntFilter<"FplPlayer"> | number
    updatedAt?: DateTimeFilter<"FplPlayer"> | Date | string
    team?: XOR<FplTeamScalarRelationFilter, FplTeamWhereInput>
    position?: XOR<FplPositionScalarRelationFilter, FplPositionWhereInput>
    transfersIn?: FplEntryTransferListRelationFilter
    transfersOut?: FplEntryTransferListRelationFilter
  }

  export type FplPlayerOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    firstName?: SortOrder
    secondName?: SortOrder
    webName?: SortOrder
    nowCost?: SortOrder
    status?: SortOrder
    news?: SortOrderInput | SortOrder
    selectedByPercent?: SortOrderInput | SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
    updatedAt?: SortOrder
    team?: FplTeamOrderByWithRelationInput
    position?: FplPositionOrderByWithRelationInput
    transfersIn?: FplEntryTransferOrderByRelationAggregateInput
    transfersOut?: FplEntryTransferOrderByRelationAggregateInput
  }

  export type FplPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplPlayerWhereInput | FplPlayerWhereInput[]
    OR?: FplPlayerWhereInput[]
    NOT?: FplPlayerWhereInput | FplPlayerWhereInput[]
    teamId?: IntFilter<"FplPlayer"> | number
    positionId?: IntFilter<"FplPlayer"> | number
    firstName?: StringFilter<"FplPlayer"> | string
    secondName?: StringFilter<"FplPlayer"> | string
    webName?: StringFilter<"FplPlayer"> | string
    nowCost?: IntFilter<"FplPlayer"> | number
    status?: StringFilter<"FplPlayer"> | string
    news?: StringNullableFilter<"FplPlayer"> | string | null
    selectedByPercent?: FloatNullableFilter<"FplPlayer"> | number | null
    transfersInEvent?: IntFilter<"FplPlayer"> | number
    transfersOutEvent?: IntFilter<"FplPlayer"> | number
    updatedAt?: DateTimeFilter<"FplPlayer"> | Date | string
    team?: XOR<FplTeamScalarRelationFilter, FplTeamWhereInput>
    position?: XOR<FplPositionScalarRelationFilter, FplPositionWhereInput>
    transfersIn?: FplEntryTransferListRelationFilter
    transfersOut?: FplEntryTransferListRelationFilter
  }, "id">

  export type FplPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    firstName?: SortOrder
    secondName?: SortOrder
    webName?: SortOrder
    nowCost?: SortOrder
    status?: SortOrder
    news?: SortOrderInput | SortOrder
    selectedByPercent?: SortOrderInput | SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
    updatedAt?: SortOrder
    _count?: FplPlayerCountOrderByAggregateInput
    _avg?: FplPlayerAvgOrderByAggregateInput
    _max?: FplPlayerMaxOrderByAggregateInput
    _min?: FplPlayerMinOrderByAggregateInput
    _sum?: FplPlayerSumOrderByAggregateInput
  }

  export type FplPlayerScalarWhereWithAggregatesInput = {
    AND?: FplPlayerScalarWhereWithAggregatesInput | FplPlayerScalarWhereWithAggregatesInput[]
    OR?: FplPlayerScalarWhereWithAggregatesInput[]
    NOT?: FplPlayerScalarWhereWithAggregatesInput | FplPlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplPlayer"> | number
    teamId?: IntWithAggregatesFilter<"FplPlayer"> | number
    positionId?: IntWithAggregatesFilter<"FplPlayer"> | number
    firstName?: StringWithAggregatesFilter<"FplPlayer"> | string
    secondName?: StringWithAggregatesFilter<"FplPlayer"> | string
    webName?: StringWithAggregatesFilter<"FplPlayer"> | string
    nowCost?: IntWithAggregatesFilter<"FplPlayer"> | number
    status?: StringWithAggregatesFilter<"FplPlayer"> | string
    news?: StringNullableWithAggregatesFilter<"FplPlayer"> | string | null
    selectedByPercent?: FloatNullableWithAggregatesFilter<"FplPlayer"> | number | null
    transfersInEvent?: IntWithAggregatesFilter<"FplPlayer"> | number
    transfersOutEvent?: IntWithAggregatesFilter<"FplPlayer"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"FplPlayer"> | Date | string
  }

  export type FplGameweekWhereInput = {
    AND?: FplGameweekWhereInput | FplGameweekWhereInput[]
    OR?: FplGameweekWhereInput[]
    NOT?: FplGameweekWhereInput | FplGameweekWhereInput[]
    id?: IntFilter<"FplGameweek"> | number
    name?: StringFilter<"FplGameweek"> | string
    deadlineTime?: DateTimeFilter<"FplGameweek"> | Date | string
    finished?: BoolFilter<"FplGameweek"> | boolean
    isCurrent?: BoolFilter<"FplGameweek"> | boolean
    isNext?: BoolFilter<"FplGameweek"> | boolean
    updatedAt?: DateTimeFilter<"FplGameweek"> | Date | string
    entrySnapshots?: FplEntrySnapshotListRelationFilter
    entryTransfers?: FplEntryTransferListRelationFilter
  }

  export type FplGameweekOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    deadlineTime?: SortOrder
    finished?: SortOrder
    isCurrent?: SortOrder
    isNext?: SortOrder
    updatedAt?: SortOrder
    entrySnapshots?: FplEntrySnapshotOrderByRelationAggregateInput
    entryTransfers?: FplEntryTransferOrderByRelationAggregateInput
  }

  export type FplGameweekWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplGameweekWhereInput | FplGameweekWhereInput[]
    OR?: FplGameweekWhereInput[]
    NOT?: FplGameweekWhereInput | FplGameweekWhereInput[]
    name?: StringFilter<"FplGameweek"> | string
    deadlineTime?: DateTimeFilter<"FplGameweek"> | Date | string
    finished?: BoolFilter<"FplGameweek"> | boolean
    isCurrent?: BoolFilter<"FplGameweek"> | boolean
    isNext?: BoolFilter<"FplGameweek"> | boolean
    updatedAt?: DateTimeFilter<"FplGameweek"> | Date | string
    entrySnapshots?: FplEntrySnapshotListRelationFilter
    entryTransfers?: FplEntryTransferListRelationFilter
  }, "id">

  export type FplGameweekOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    deadlineTime?: SortOrder
    finished?: SortOrder
    isCurrent?: SortOrder
    isNext?: SortOrder
    updatedAt?: SortOrder
    _count?: FplGameweekCountOrderByAggregateInput
    _avg?: FplGameweekAvgOrderByAggregateInput
    _max?: FplGameweekMaxOrderByAggregateInput
    _min?: FplGameweekMinOrderByAggregateInput
    _sum?: FplGameweekSumOrderByAggregateInput
  }

  export type FplGameweekScalarWhereWithAggregatesInput = {
    AND?: FplGameweekScalarWhereWithAggregatesInput | FplGameweekScalarWhereWithAggregatesInput[]
    OR?: FplGameweekScalarWhereWithAggregatesInput[]
    NOT?: FplGameweekScalarWhereWithAggregatesInput | FplGameweekScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplGameweek"> | number
    name?: StringWithAggregatesFilter<"FplGameweek"> | string
    deadlineTime?: DateTimeWithAggregatesFilter<"FplGameweek"> | Date | string
    finished?: BoolWithAggregatesFilter<"FplGameweek"> | boolean
    isCurrent?: BoolWithAggregatesFilter<"FplGameweek"> | boolean
    isNext?: BoolWithAggregatesFilter<"FplGameweek"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"FplGameweek"> | Date | string
  }

  export type FplLeagueWhereInput = {
    AND?: FplLeagueWhereInput | FplLeagueWhereInput[]
    OR?: FplLeagueWhereInput[]
    NOT?: FplLeagueWhereInput | FplLeagueWhereInput[]
    id?: IntFilter<"FplLeague"> | number
    name?: StringFilter<"FplLeague"> | string
    createdAt?: DateTimeFilter<"FplLeague"> | Date | string
    updatedAt?: DateTimeFilter<"FplLeague"> | Date | string
    entries?: FplLeagueEntryListRelationFilter
    entrySnapshots?: FplEntrySnapshotListRelationFilter
  }

  export type FplLeagueOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entries?: FplLeagueEntryOrderByRelationAggregateInput
    entrySnapshots?: FplEntrySnapshotOrderByRelationAggregateInput
  }

  export type FplLeagueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplLeagueWhereInput | FplLeagueWhereInput[]
    OR?: FplLeagueWhereInput[]
    NOT?: FplLeagueWhereInput | FplLeagueWhereInput[]
    name?: StringFilter<"FplLeague"> | string
    createdAt?: DateTimeFilter<"FplLeague"> | Date | string
    updatedAt?: DateTimeFilter<"FplLeague"> | Date | string
    entries?: FplLeagueEntryListRelationFilter
    entrySnapshots?: FplEntrySnapshotListRelationFilter
  }, "id">

  export type FplLeagueOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FplLeagueCountOrderByAggregateInput
    _avg?: FplLeagueAvgOrderByAggregateInput
    _max?: FplLeagueMaxOrderByAggregateInput
    _min?: FplLeagueMinOrderByAggregateInput
    _sum?: FplLeagueSumOrderByAggregateInput
  }

  export type FplLeagueScalarWhereWithAggregatesInput = {
    AND?: FplLeagueScalarWhereWithAggregatesInput | FplLeagueScalarWhereWithAggregatesInput[]
    OR?: FplLeagueScalarWhereWithAggregatesInput[]
    NOT?: FplLeagueScalarWhereWithAggregatesInput | FplLeagueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplLeague"> | number
    name?: StringWithAggregatesFilter<"FplLeague"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FplLeague"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FplLeague"> | Date | string
  }

  export type FplLeagueEntryWhereInput = {
    AND?: FplLeagueEntryWhereInput | FplLeagueEntryWhereInput[]
    OR?: FplLeagueEntryWhereInput[]
    NOT?: FplLeagueEntryWhereInput | FplLeagueEntryWhereInput[]
    id?: IntFilter<"FplLeagueEntry"> | number
    leagueId?: IntFilter<"FplLeagueEntry"> | number
    entryName?: StringFilter<"FplLeagueEntry"> | string
    playerName?: StringFilter<"FplLeagueEntry"> | string
    rank?: IntFilter<"FplLeagueEntry"> | number
    lastRank?: IntNullableFilter<"FplLeagueEntry"> | number | null
    totalPoints?: IntFilter<"FplLeagueEntry"> | number
    updatedAt?: DateTimeFilter<"FplLeagueEntry"> | Date | string
    league?: XOR<FplLeagueScalarRelationFilter, FplLeagueWhereInput>
    transfers?: FplEntryTransferListRelationFilter
    behaviourProfile?: XOR<FplEntryBehaviourProfileNullableScalarRelationFilter, FplEntryBehaviourProfileWhereInput> | null
  }

  export type FplLeagueEntryOrderByWithRelationInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryName?: SortOrder
    playerName?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrderInput | SortOrder
    totalPoints?: SortOrder
    updatedAt?: SortOrder
    league?: FplLeagueOrderByWithRelationInput
    transfers?: FplEntryTransferOrderByRelationAggregateInput
    behaviourProfile?: FplEntryBehaviourProfileOrderByWithRelationInput
  }

  export type FplLeagueEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplLeagueEntryWhereInput | FplLeagueEntryWhereInput[]
    OR?: FplLeagueEntryWhereInput[]
    NOT?: FplLeagueEntryWhereInput | FplLeagueEntryWhereInput[]
    leagueId?: IntFilter<"FplLeagueEntry"> | number
    entryName?: StringFilter<"FplLeagueEntry"> | string
    playerName?: StringFilter<"FplLeagueEntry"> | string
    rank?: IntFilter<"FplLeagueEntry"> | number
    lastRank?: IntNullableFilter<"FplLeagueEntry"> | number | null
    totalPoints?: IntFilter<"FplLeagueEntry"> | number
    updatedAt?: DateTimeFilter<"FplLeagueEntry"> | Date | string
    league?: XOR<FplLeagueScalarRelationFilter, FplLeagueWhereInput>
    transfers?: FplEntryTransferListRelationFilter
    behaviourProfile?: XOR<FplEntryBehaviourProfileNullableScalarRelationFilter, FplEntryBehaviourProfileWhereInput> | null
  }, "id">

  export type FplLeagueEntryOrderByWithAggregationInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryName?: SortOrder
    playerName?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrderInput | SortOrder
    totalPoints?: SortOrder
    updatedAt?: SortOrder
    _count?: FplLeagueEntryCountOrderByAggregateInput
    _avg?: FplLeagueEntryAvgOrderByAggregateInput
    _max?: FplLeagueEntryMaxOrderByAggregateInput
    _min?: FplLeagueEntryMinOrderByAggregateInput
    _sum?: FplLeagueEntrySumOrderByAggregateInput
  }

  export type FplLeagueEntryScalarWhereWithAggregatesInput = {
    AND?: FplLeagueEntryScalarWhereWithAggregatesInput | FplLeagueEntryScalarWhereWithAggregatesInput[]
    OR?: FplLeagueEntryScalarWhereWithAggregatesInput[]
    NOT?: FplLeagueEntryScalarWhereWithAggregatesInput | FplLeagueEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplLeagueEntry"> | number
    leagueId?: IntWithAggregatesFilter<"FplLeagueEntry"> | number
    entryName?: StringWithAggregatesFilter<"FplLeagueEntry"> | string
    playerName?: StringWithAggregatesFilter<"FplLeagueEntry"> | string
    rank?: IntWithAggregatesFilter<"FplLeagueEntry"> | number
    lastRank?: IntNullableWithAggregatesFilter<"FplLeagueEntry"> | number | null
    totalPoints?: IntWithAggregatesFilter<"FplLeagueEntry"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"FplLeagueEntry"> | Date | string
  }

  export type FplEntrySnapshotWhereInput = {
    AND?: FplEntrySnapshotWhereInput | FplEntrySnapshotWhereInput[]
    OR?: FplEntrySnapshotWhereInput[]
    NOT?: FplEntrySnapshotWhereInput | FplEntrySnapshotWhereInput[]
    id?: StringFilter<"FplEntrySnapshot"> | string
    leagueId?: IntFilter<"FplEntrySnapshot"> | number
    entryId?: IntFilter<"FplEntrySnapshot"> | number
    eventId?: IntFilter<"FplEntrySnapshot"> | number
    bank?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    teamValue?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    eventTransfers?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    eventTransfersCost?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    fetchedAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    createdAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    league?: XOR<FplLeagueScalarRelationFilter, FplLeagueWhereInput>
    event?: XOR<FplGameweekScalarRelationFilter, FplGameweekWhereInput>
    picks?: FplEntryPickListRelationFilter
  }

  export type FplEntrySnapshotOrderByWithRelationInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrderInput | SortOrder
    teamValue?: SortOrderInput | SortOrder
    eventTransfers?: SortOrderInput | SortOrder
    eventTransfersCost?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    league?: FplLeagueOrderByWithRelationInput
    event?: FplGameweekOrderByWithRelationInput
    picks?: FplEntryPickOrderByRelationAggregateInput
  }

  export type FplEntrySnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leagueId_entryId_eventId?: FplEntrySnapshotLeagueIdEntryIdEventIdCompoundUniqueInput
    AND?: FplEntrySnapshotWhereInput | FplEntrySnapshotWhereInput[]
    OR?: FplEntrySnapshotWhereInput[]
    NOT?: FplEntrySnapshotWhereInput | FplEntrySnapshotWhereInput[]
    leagueId?: IntFilter<"FplEntrySnapshot"> | number
    entryId?: IntFilter<"FplEntrySnapshot"> | number
    eventId?: IntFilter<"FplEntrySnapshot"> | number
    bank?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    teamValue?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    eventTransfers?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    eventTransfersCost?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    fetchedAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    createdAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    league?: XOR<FplLeagueScalarRelationFilter, FplLeagueWhereInput>
    event?: XOR<FplGameweekScalarRelationFilter, FplGameweekWhereInput>
    picks?: FplEntryPickListRelationFilter
  }, "id" | "leagueId_entryId_eventId">

  export type FplEntrySnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrderInput | SortOrder
    teamValue?: SortOrderInput | SortOrder
    eventTransfers?: SortOrderInput | SortOrder
    eventTransfersCost?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FplEntrySnapshotCountOrderByAggregateInput
    _avg?: FplEntrySnapshotAvgOrderByAggregateInput
    _max?: FplEntrySnapshotMaxOrderByAggregateInput
    _min?: FplEntrySnapshotMinOrderByAggregateInput
    _sum?: FplEntrySnapshotSumOrderByAggregateInput
  }

  export type FplEntrySnapshotScalarWhereWithAggregatesInput = {
    AND?: FplEntrySnapshotScalarWhereWithAggregatesInput | FplEntrySnapshotScalarWhereWithAggregatesInput[]
    OR?: FplEntrySnapshotScalarWhereWithAggregatesInput[]
    NOT?: FplEntrySnapshotScalarWhereWithAggregatesInput | FplEntrySnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FplEntrySnapshot"> | string
    leagueId?: IntWithAggregatesFilter<"FplEntrySnapshot"> | number
    entryId?: IntWithAggregatesFilter<"FplEntrySnapshot"> | number
    eventId?: IntWithAggregatesFilter<"FplEntrySnapshot"> | number
    bank?: IntNullableWithAggregatesFilter<"FplEntrySnapshot"> | number | null
    teamValue?: IntNullableWithAggregatesFilter<"FplEntrySnapshot"> | number | null
    eventTransfers?: IntNullableWithAggregatesFilter<"FplEntrySnapshot"> | number | null
    eventTransfersCost?: IntNullableWithAggregatesFilter<"FplEntrySnapshot"> | number | null
    fetchedAt?: DateTimeWithAggregatesFilter<"FplEntrySnapshot"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"FplEntrySnapshot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FplEntrySnapshot"> | Date | string
  }

  export type FplEntryPickWhereInput = {
    AND?: FplEntryPickWhereInput | FplEntryPickWhereInput[]
    OR?: FplEntryPickWhereInput[]
    NOT?: FplEntryPickWhereInput | FplEntryPickWhereInput[]
    id?: StringFilter<"FplEntryPick"> | string
    snapshotId?: StringFilter<"FplEntryPick"> | string
    playerId?: IntFilter<"FplEntryPick"> | number
    pickPosition?: IntFilter<"FplEntryPick"> | number
    multiplier?: IntFilter<"FplEntryPick"> | number
    isCaptain?: BoolFilter<"FplEntryPick"> | boolean
    isViceCaptain?: BoolFilter<"FplEntryPick"> | boolean
    snapshot?: XOR<FplEntrySnapshotScalarRelationFilter, FplEntrySnapshotWhereInput>
  }

  export type FplEntryPickOrderByWithRelationInput = {
    id?: SortOrder
    snapshotId?: SortOrder
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
    isCaptain?: SortOrder
    isViceCaptain?: SortOrder
    snapshot?: FplEntrySnapshotOrderByWithRelationInput
  }

  export type FplEntryPickWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    snapshotId_pickPosition?: FplEntryPickSnapshotIdPickPositionCompoundUniqueInput
    AND?: FplEntryPickWhereInput | FplEntryPickWhereInput[]
    OR?: FplEntryPickWhereInput[]
    NOT?: FplEntryPickWhereInput | FplEntryPickWhereInput[]
    snapshotId?: StringFilter<"FplEntryPick"> | string
    playerId?: IntFilter<"FplEntryPick"> | number
    pickPosition?: IntFilter<"FplEntryPick"> | number
    multiplier?: IntFilter<"FplEntryPick"> | number
    isCaptain?: BoolFilter<"FplEntryPick"> | boolean
    isViceCaptain?: BoolFilter<"FplEntryPick"> | boolean
    snapshot?: XOR<FplEntrySnapshotScalarRelationFilter, FplEntrySnapshotWhereInput>
  }, "id" | "snapshotId_pickPosition">

  export type FplEntryPickOrderByWithAggregationInput = {
    id?: SortOrder
    snapshotId?: SortOrder
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
    isCaptain?: SortOrder
    isViceCaptain?: SortOrder
    _count?: FplEntryPickCountOrderByAggregateInput
    _avg?: FplEntryPickAvgOrderByAggregateInput
    _max?: FplEntryPickMaxOrderByAggregateInput
    _min?: FplEntryPickMinOrderByAggregateInput
    _sum?: FplEntryPickSumOrderByAggregateInput
  }

  export type FplEntryPickScalarWhereWithAggregatesInput = {
    AND?: FplEntryPickScalarWhereWithAggregatesInput | FplEntryPickScalarWhereWithAggregatesInput[]
    OR?: FplEntryPickScalarWhereWithAggregatesInput[]
    NOT?: FplEntryPickScalarWhereWithAggregatesInput | FplEntryPickScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FplEntryPick"> | string
    snapshotId?: StringWithAggregatesFilter<"FplEntryPick"> | string
    playerId?: IntWithAggregatesFilter<"FplEntryPick"> | number
    pickPosition?: IntWithAggregatesFilter<"FplEntryPick"> | number
    multiplier?: IntWithAggregatesFilter<"FplEntryPick"> | number
    isCaptain?: BoolWithAggregatesFilter<"FplEntryPick"> | boolean
    isViceCaptain?: BoolWithAggregatesFilter<"FplEntryPick"> | boolean
  }

  export type FplEntryTransferWhereInput = {
    AND?: FplEntryTransferWhereInput | FplEntryTransferWhereInput[]
    OR?: FplEntryTransferWhereInput[]
    NOT?: FplEntryTransferWhereInput | FplEntryTransferWhereInput[]
    id?: StringFilter<"FplEntryTransfer"> | string
    entryId?: IntFilter<"FplEntryTransfer"> | number
    eventId?: IntFilter<"FplEntryTransfer"> | number
    time?: DateTimeFilter<"FplEntryTransfer"> | Date | string
    playerInId?: IntFilter<"FplEntryTransfer"> | number
    playerOutId?: IntFilter<"FplEntryTransfer"> | number
    value?: IntNullableFilter<"FplEntryTransfer"> | number | null
    bank?: IntNullableFilter<"FplEntryTransfer"> | number | null
    cost?: IntNullableFilter<"FplEntryTransfer"> | number | null
    createdAt?: DateTimeFilter<"FplEntryTransfer"> | Date | string
    entry?: XOR<FplLeagueEntryScalarRelationFilter, FplLeagueEntryWhereInput>
    event?: XOR<FplGameweekScalarRelationFilter, FplGameweekWhereInput>
    playerIn?: XOR<FplPlayerScalarRelationFilter, FplPlayerWhereInput>
    playerOut?: XOR<FplPlayerScalarRelationFilter, FplPlayerWhereInput>
  }

  export type FplEntryTransferOrderByWithRelationInput = {
    id?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    time?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrderInput | SortOrder
    bank?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    entry?: FplLeagueEntryOrderByWithRelationInput
    event?: FplGameweekOrderByWithRelationInput
    playerIn?: FplPlayerOrderByWithRelationInput
    playerOut?: FplPlayerOrderByWithRelationInput
  }

  export type FplEntryTransferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    entryId_eventId_time_playerInId_playerOutId?: FplEntryTransferEntryIdEventIdTimePlayerInIdPlayerOutIdCompoundUniqueInput
    AND?: FplEntryTransferWhereInput | FplEntryTransferWhereInput[]
    OR?: FplEntryTransferWhereInput[]
    NOT?: FplEntryTransferWhereInput | FplEntryTransferWhereInput[]
    entryId?: IntFilter<"FplEntryTransfer"> | number
    eventId?: IntFilter<"FplEntryTransfer"> | number
    time?: DateTimeFilter<"FplEntryTransfer"> | Date | string
    playerInId?: IntFilter<"FplEntryTransfer"> | number
    playerOutId?: IntFilter<"FplEntryTransfer"> | number
    value?: IntNullableFilter<"FplEntryTransfer"> | number | null
    bank?: IntNullableFilter<"FplEntryTransfer"> | number | null
    cost?: IntNullableFilter<"FplEntryTransfer"> | number | null
    createdAt?: DateTimeFilter<"FplEntryTransfer"> | Date | string
    entry?: XOR<FplLeagueEntryScalarRelationFilter, FplLeagueEntryWhereInput>
    event?: XOR<FplGameweekScalarRelationFilter, FplGameweekWhereInput>
    playerIn?: XOR<FplPlayerScalarRelationFilter, FplPlayerWhereInput>
    playerOut?: XOR<FplPlayerScalarRelationFilter, FplPlayerWhereInput>
  }, "id" | "entryId_eventId_time_playerInId_playerOutId">

  export type FplEntryTransferOrderByWithAggregationInput = {
    id?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    time?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrderInput | SortOrder
    bank?: SortOrderInput | SortOrder
    cost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FplEntryTransferCountOrderByAggregateInput
    _avg?: FplEntryTransferAvgOrderByAggregateInput
    _max?: FplEntryTransferMaxOrderByAggregateInput
    _min?: FplEntryTransferMinOrderByAggregateInput
    _sum?: FplEntryTransferSumOrderByAggregateInput
  }

  export type FplEntryTransferScalarWhereWithAggregatesInput = {
    AND?: FplEntryTransferScalarWhereWithAggregatesInput | FplEntryTransferScalarWhereWithAggregatesInput[]
    OR?: FplEntryTransferScalarWhereWithAggregatesInput[]
    NOT?: FplEntryTransferScalarWhereWithAggregatesInput | FplEntryTransferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FplEntryTransfer"> | string
    entryId?: IntWithAggregatesFilter<"FplEntryTransfer"> | number
    eventId?: IntWithAggregatesFilter<"FplEntryTransfer"> | number
    time?: DateTimeWithAggregatesFilter<"FplEntryTransfer"> | Date | string
    playerInId?: IntWithAggregatesFilter<"FplEntryTransfer"> | number
    playerOutId?: IntWithAggregatesFilter<"FplEntryTransfer"> | number
    value?: IntNullableWithAggregatesFilter<"FplEntryTransfer"> | number | null
    bank?: IntNullableWithAggregatesFilter<"FplEntryTransfer"> | number | null
    cost?: IntNullableWithAggregatesFilter<"FplEntryTransfer"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"FplEntryTransfer"> | Date | string
  }

  export type FplEntryBehaviourProfileWhereInput = {
    AND?: FplEntryBehaviourProfileWhereInput | FplEntryBehaviourProfileWhereInput[]
    OR?: FplEntryBehaviourProfileWhereInput[]
    NOT?: FplEntryBehaviourProfileWhereInput | FplEntryBehaviourProfileWhereInput[]
    entryId?: IntFilter<"FplEntryBehaviourProfile"> | number
    transfersCount?: IntFilter<"FplEntryBehaviourProfile"> | number
    hitsCount?: IntFilter<"FplEntryBehaviourProfile"> | number
    totalHitCost?: IntFilter<"FplEntryBehaviourProfile"> | number
    avgTransfersPerGw?: FloatFilter<"FplEntryBehaviourProfile"> | number
    hitRate?: FloatFilter<"FplEntryBehaviourProfile"> | number
    lastTransferAt?: DateTimeNullableFilter<"FplEntryBehaviourProfile"> | Date | string | null
    updatedAt?: DateTimeFilter<"FplEntryBehaviourProfile"> | Date | string
    entry?: XOR<FplLeagueEntryScalarRelationFilter, FplLeagueEntryWhereInput>
  }

  export type FplEntryBehaviourProfileOrderByWithRelationInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
    lastTransferAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    entry?: FplLeagueEntryOrderByWithRelationInput
  }

  export type FplEntryBehaviourProfileWhereUniqueInput = Prisma.AtLeast<{
    entryId?: number
    AND?: FplEntryBehaviourProfileWhereInput | FplEntryBehaviourProfileWhereInput[]
    OR?: FplEntryBehaviourProfileWhereInput[]
    NOT?: FplEntryBehaviourProfileWhereInput | FplEntryBehaviourProfileWhereInput[]
    transfersCount?: IntFilter<"FplEntryBehaviourProfile"> | number
    hitsCount?: IntFilter<"FplEntryBehaviourProfile"> | number
    totalHitCost?: IntFilter<"FplEntryBehaviourProfile"> | number
    avgTransfersPerGw?: FloatFilter<"FplEntryBehaviourProfile"> | number
    hitRate?: FloatFilter<"FplEntryBehaviourProfile"> | number
    lastTransferAt?: DateTimeNullableFilter<"FplEntryBehaviourProfile"> | Date | string | null
    updatedAt?: DateTimeFilter<"FplEntryBehaviourProfile"> | Date | string
    entry?: XOR<FplLeagueEntryScalarRelationFilter, FplLeagueEntryWhereInput>
  }, "entryId">

  export type FplEntryBehaviourProfileOrderByWithAggregationInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
    lastTransferAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: FplEntryBehaviourProfileCountOrderByAggregateInput
    _avg?: FplEntryBehaviourProfileAvgOrderByAggregateInput
    _max?: FplEntryBehaviourProfileMaxOrderByAggregateInput
    _min?: FplEntryBehaviourProfileMinOrderByAggregateInput
    _sum?: FplEntryBehaviourProfileSumOrderByAggregateInput
  }

  export type FplEntryBehaviourProfileScalarWhereWithAggregatesInput = {
    AND?: FplEntryBehaviourProfileScalarWhereWithAggregatesInput | FplEntryBehaviourProfileScalarWhereWithAggregatesInput[]
    OR?: FplEntryBehaviourProfileScalarWhereWithAggregatesInput[]
    NOT?: FplEntryBehaviourProfileScalarWhereWithAggregatesInput | FplEntryBehaviourProfileScalarWhereWithAggregatesInput[]
    entryId?: IntWithAggregatesFilter<"FplEntryBehaviourProfile"> | number
    transfersCount?: IntWithAggregatesFilter<"FplEntryBehaviourProfile"> | number
    hitsCount?: IntWithAggregatesFilter<"FplEntryBehaviourProfile"> | number
    totalHitCost?: IntWithAggregatesFilter<"FplEntryBehaviourProfile"> | number
    avgTransfersPerGw?: FloatWithAggregatesFilter<"FplEntryBehaviourProfile"> | number
    hitRate?: FloatWithAggregatesFilter<"FplEntryBehaviourProfile"> | number
    lastTransferAt?: DateTimeNullableWithAggregatesFilter<"FplEntryBehaviourProfile"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"FplEntryBehaviourProfile"> | Date | string
  }

  export type FplFixtureWhereInput = {
    AND?: FplFixtureWhereInput | FplFixtureWhereInput[]
    OR?: FplFixtureWhereInput[]
    NOT?: FplFixtureWhereInput | FplFixtureWhereInput[]
    id?: IntFilter<"FplFixture"> | number
    eventId?: IntNullableFilter<"FplFixture"> | number | null
    teamHId?: IntFilter<"FplFixture"> | number
    teamAId?: IntFilter<"FplFixture"> | number
    teamHDifficulty?: IntFilter<"FplFixture"> | number
    teamADifficulty?: IntFilter<"FplFixture"> | number
    kickoffTime?: DateTimeNullableFilter<"FplFixture"> | Date | string | null
    finished?: BoolFilter<"FplFixture"> | boolean
  }

  export type FplFixtureOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrderInput | SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
    kickoffTime?: SortOrderInput | SortOrder
    finished?: SortOrder
  }

  export type FplFixtureWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FplFixtureWhereInput | FplFixtureWhereInput[]
    OR?: FplFixtureWhereInput[]
    NOT?: FplFixtureWhereInput | FplFixtureWhereInput[]
    eventId?: IntNullableFilter<"FplFixture"> | number | null
    teamHId?: IntFilter<"FplFixture"> | number
    teamAId?: IntFilter<"FplFixture"> | number
    teamHDifficulty?: IntFilter<"FplFixture"> | number
    teamADifficulty?: IntFilter<"FplFixture"> | number
    kickoffTime?: DateTimeNullableFilter<"FplFixture"> | Date | string | null
    finished?: BoolFilter<"FplFixture"> | boolean
  }, "id">

  export type FplFixtureOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrderInput | SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
    kickoffTime?: SortOrderInput | SortOrder
    finished?: SortOrder
    _count?: FplFixtureCountOrderByAggregateInput
    _avg?: FplFixtureAvgOrderByAggregateInput
    _max?: FplFixtureMaxOrderByAggregateInput
    _min?: FplFixtureMinOrderByAggregateInput
    _sum?: FplFixtureSumOrderByAggregateInput
  }

  export type FplFixtureScalarWhereWithAggregatesInput = {
    AND?: FplFixtureScalarWhereWithAggregatesInput | FplFixtureScalarWhereWithAggregatesInput[]
    OR?: FplFixtureScalarWhereWithAggregatesInput[]
    NOT?: FplFixtureScalarWhereWithAggregatesInput | FplFixtureScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FplFixture"> | number
    eventId?: IntNullableWithAggregatesFilter<"FplFixture"> | number | null
    teamHId?: IntWithAggregatesFilter<"FplFixture"> | number
    teamAId?: IntWithAggregatesFilter<"FplFixture"> | number
    teamHDifficulty?: IntWithAggregatesFilter<"FplFixture"> | number
    teamADifficulty?: IntWithAggregatesFilter<"FplFixture"> | number
    kickoffTime?: DateTimeNullableWithAggregatesFilter<"FplFixture"> | Date | string | null
    finished?: BoolWithAggregatesFilter<"FplFixture"> | boolean
  }

  export type FplBootstrapSnapshotCreateInput = {
    id?: string
    fetchedAt?: Date | string
    source?: string
    hash?: string | null
    teamsCount: number
    playersCount: number
    positionsCount: number
    gameweeksCount: number
  }

  export type FplBootstrapSnapshotUncheckedCreateInput = {
    id?: string
    fetchedAt?: Date | string
    source?: string
    hash?: string | null
    teamsCount: number
    playersCount: number
    positionsCount: number
    gameweeksCount: number
  }

  export type FplBootstrapSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    teamsCount?: IntFieldUpdateOperationsInput | number
    playersCount?: IntFieldUpdateOperationsInput | number
    positionsCount?: IntFieldUpdateOperationsInput | number
    gameweeksCount?: IntFieldUpdateOperationsInput | number
  }

  export type FplBootstrapSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    teamsCount?: IntFieldUpdateOperationsInput | number
    playersCount?: IntFieldUpdateOperationsInput | number
    positionsCount?: IntFieldUpdateOperationsInput | number
    gameweeksCount?: IntFieldUpdateOperationsInput | number
  }

  export type FplBootstrapSnapshotCreateManyInput = {
    id?: string
    fetchedAt?: Date | string
    source?: string
    hash?: string | null
    teamsCount: number
    playersCount: number
    positionsCount: number
    gameweeksCount: number
  }

  export type FplBootstrapSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    teamsCount?: IntFieldUpdateOperationsInput | number
    playersCount?: IntFieldUpdateOperationsInput | number
    positionsCount?: IntFieldUpdateOperationsInput | number
    gameweeksCount?: IntFieldUpdateOperationsInput | number
  }

  export type FplBootstrapSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    teamsCount?: IntFieldUpdateOperationsInput | number
    playersCount?: IntFieldUpdateOperationsInput | number
    positionsCount?: IntFieldUpdateOperationsInput | number
    gameweeksCount?: IntFieldUpdateOperationsInput | number
  }

  export type FplTeamCreateInput = {
    id: number
    name: string
    shortName: string
    code?: number | null
    updatedAt?: Date | string
    players?: FplPlayerCreateNestedManyWithoutTeamInput
  }

  export type FplTeamUncheckedCreateInput = {
    id: number
    name: string
    shortName: string
    code?: number | null
    updatedAt?: Date | string
    players?: FplPlayerUncheckedCreateNestedManyWithoutTeamInput
  }

  export type FplTeamUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    code?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: FplPlayerUpdateManyWithoutTeamNestedInput
  }

  export type FplTeamUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    code?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: FplPlayerUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type FplTeamCreateManyInput = {
    id: number
    name: string
    shortName: string
    code?: number | null
    updatedAt?: Date | string
  }

  export type FplTeamUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    code?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplTeamUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    code?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPositionCreateInput = {
    id: number
    shortName: string
    updatedAt?: Date | string
    players?: FplPlayerCreateNestedManyWithoutPositionInput
  }

  export type FplPositionUncheckedCreateInput = {
    id: number
    shortName: string
    updatedAt?: Date | string
    players?: FplPlayerUncheckedCreateNestedManyWithoutPositionInput
  }

  export type FplPositionUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    shortName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: FplPlayerUpdateManyWithoutPositionNestedInput
  }

  export type FplPositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    shortName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: FplPlayerUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type FplPositionCreateManyInput = {
    id: number
    shortName: string
    updatedAt?: Date | string
  }

  export type FplPositionUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    shortName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    shortName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPlayerCreateInput = {
    id: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    team: FplTeamCreateNestedOneWithoutPlayersInput
    position: FplPositionCreateNestedOneWithoutPlayersInput
    transfersIn?: FplEntryTransferCreateNestedManyWithoutPlayerInInput
    transfersOut?: FplEntryTransferCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerUncheckedCreateInput = {
    id: number
    teamId: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    transfersIn?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerInInput
    transfersOut?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: FplTeamUpdateOneRequiredWithoutPlayersNestedInput
    position?: FplPositionUpdateOneRequiredWithoutPlayersNestedInput
    transfersIn?: FplEntryTransferUpdateManyWithoutPlayerInNestedInput
    transfersOut?: FplEntryTransferUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfersIn?: FplEntryTransferUncheckedUpdateManyWithoutPlayerInNestedInput
    transfersOut?: FplEntryTransferUncheckedUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerCreateManyInput = {
    id: number
    teamId: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
  }

  export type FplPlayerUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplGameweekCreateInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
    entrySnapshots?: FplEntrySnapshotCreateNestedManyWithoutEventInput
    entryTransfers?: FplEntryTransferCreateNestedManyWithoutEventInput
  }

  export type FplGameweekUncheckedCreateInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
    entrySnapshots?: FplEntrySnapshotUncheckedCreateNestedManyWithoutEventInput
    entryTransfers?: FplEntryTransferUncheckedCreateNestedManyWithoutEventInput
  }

  export type FplGameweekUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entrySnapshots?: FplEntrySnapshotUpdateManyWithoutEventNestedInput
    entryTransfers?: FplEntryTransferUpdateManyWithoutEventNestedInput
  }

  export type FplGameweekUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entrySnapshots?: FplEntrySnapshotUncheckedUpdateManyWithoutEventNestedInput
    entryTransfers?: FplEntryTransferUncheckedUpdateManyWithoutEventNestedInput
  }

  export type FplGameweekCreateManyInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
  }

  export type FplGameweekUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplGameweekUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueCreateInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FplLeagueEntryCreateNestedManyWithoutLeagueInput
    entrySnapshots?: FplEntrySnapshotCreateNestedManyWithoutLeagueInput
  }

  export type FplLeagueUncheckedCreateInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FplLeagueEntryUncheckedCreateNestedManyWithoutLeagueInput
    entrySnapshots?: FplEntrySnapshotUncheckedCreateNestedManyWithoutLeagueInput
  }

  export type FplLeagueUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FplLeagueEntryUpdateManyWithoutLeagueNestedInput
    entrySnapshots?: FplEntrySnapshotUpdateManyWithoutLeagueNestedInput
  }

  export type FplLeagueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FplLeagueEntryUncheckedUpdateManyWithoutLeagueNestedInput
    entrySnapshots?: FplEntrySnapshotUncheckedUpdateManyWithoutLeagueNestedInput
  }

  export type FplLeagueCreateManyInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FplLeagueUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueEntryCreateInput = {
    id: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    league: FplLeagueCreateNestedOneWithoutEntriesInput
    transfers?: FplEntryTransferCreateNestedManyWithoutEntryInput
    behaviourProfile?: FplEntryBehaviourProfileCreateNestedOneWithoutEntryInput
  }

  export type FplLeagueEntryUncheckedCreateInput = {
    id: number
    leagueId: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    transfers?: FplEntryTransferUncheckedCreateNestedManyWithoutEntryInput
    behaviourProfile?: FplEntryBehaviourProfileUncheckedCreateNestedOneWithoutEntryInput
  }

  export type FplLeagueEntryUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    league?: FplLeagueUpdateOneRequiredWithoutEntriesNestedInput
    transfers?: FplEntryTransferUpdateManyWithoutEntryNestedInput
    behaviourProfile?: FplEntryBehaviourProfileUpdateOneWithoutEntryNestedInput
  }

  export type FplLeagueEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    leagueId?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfers?: FplEntryTransferUncheckedUpdateManyWithoutEntryNestedInput
    behaviourProfile?: FplEntryBehaviourProfileUncheckedUpdateOneWithoutEntryNestedInput
  }

  export type FplLeagueEntryCreateManyInput = {
    id: number
    leagueId: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
  }

  export type FplLeagueEntryUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    leagueId?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntrySnapshotCreateInput = {
    id?: string
    entryId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    league: FplLeagueCreateNestedOneWithoutEntrySnapshotsInput
    event: FplGameweekCreateNestedOneWithoutEntrySnapshotsInput
    picks?: FplEntryPickCreateNestedManyWithoutSnapshotInput
  }

  export type FplEntrySnapshotUncheckedCreateInput = {
    id?: string
    leagueId: number
    entryId: number
    eventId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    picks?: FplEntryPickUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type FplEntrySnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    league?: FplLeagueUpdateOneRequiredWithoutEntrySnapshotsNestedInput
    event?: FplGameweekUpdateOneRequiredWithoutEntrySnapshotsNestedInput
    picks?: FplEntryPickUpdateManyWithoutSnapshotNestedInput
  }

  export type FplEntrySnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leagueId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: FplEntryPickUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type FplEntrySnapshotCreateManyInput = {
    id?: string
    leagueId: number
    entryId: number
    eventId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FplEntrySnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntrySnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leagueId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryPickCreateInput = {
    id?: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
    snapshot: FplEntrySnapshotCreateNestedOneWithoutPicksInput
  }

  export type FplEntryPickUncheckedCreateInput = {
    id?: string
    snapshotId: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
  }

  export type FplEntryPickUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
    snapshot?: FplEntrySnapshotUpdateOneRequiredWithoutPicksNestedInput
  }

  export type FplEntryPickUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotId?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplEntryPickCreateManyInput = {
    id?: string
    snapshotId: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
  }

  export type FplEntryPickUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplEntryPickUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotId?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplEntryTransferCreateInput = {
    id?: string
    time: Date | string
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
    entry: FplLeagueEntryCreateNestedOneWithoutTransfersInput
    event: FplGameweekCreateNestedOneWithoutEntryTransfersInput
    playerIn: FplPlayerCreateNestedOneWithoutTransfersInInput
    playerOut: FplPlayerCreateNestedOneWithoutTransfersOutInput
  }

  export type FplEntryTransferUncheckedCreateInput = {
    id?: string
    entryId: number
    eventId: number
    time: Date | string
    playerInId: number
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FplLeagueEntryUpdateOneRequiredWithoutTransfersNestedInput
    event?: FplGameweekUpdateOneRequiredWithoutEntryTransfersNestedInput
    playerIn?: FplPlayerUpdateOneRequiredWithoutTransfersInNestedInput
    playerOut?: FplPlayerUpdateOneRequiredWithoutTransfersOutNestedInput
  }

  export type FplEntryTransferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferCreateManyInput = {
    id?: string
    entryId: number
    eventId: number
    time: Date | string
    playerInId: number
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryBehaviourProfileCreateInput = {
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt?: Date | string | null
    updatedAt?: Date | string
    entry: FplLeagueEntryCreateNestedOneWithoutBehaviourProfileInput
  }

  export type FplEntryBehaviourProfileUncheckedCreateInput = {
    entryId: number
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type FplEntryBehaviourProfileUpdateInput = {
    transfersCount?: IntFieldUpdateOperationsInput | number
    hitsCount?: IntFieldUpdateOperationsInput | number
    totalHitCost?: IntFieldUpdateOperationsInput | number
    avgTransfersPerGw?: FloatFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    lastTransferAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FplLeagueEntryUpdateOneRequiredWithoutBehaviourProfileNestedInput
  }

  export type FplEntryBehaviourProfileUncheckedUpdateInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    transfersCount?: IntFieldUpdateOperationsInput | number
    hitsCount?: IntFieldUpdateOperationsInput | number
    totalHitCost?: IntFieldUpdateOperationsInput | number
    avgTransfersPerGw?: FloatFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    lastTransferAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryBehaviourProfileCreateManyInput = {
    entryId: number
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type FplEntryBehaviourProfileUpdateManyMutationInput = {
    transfersCount?: IntFieldUpdateOperationsInput | number
    hitsCount?: IntFieldUpdateOperationsInput | number
    totalHitCost?: IntFieldUpdateOperationsInput | number
    avgTransfersPerGw?: FloatFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    lastTransferAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryBehaviourProfileUncheckedUpdateManyInput = {
    entryId?: IntFieldUpdateOperationsInput | number
    transfersCount?: IntFieldUpdateOperationsInput | number
    hitsCount?: IntFieldUpdateOperationsInput | number
    totalHitCost?: IntFieldUpdateOperationsInput | number
    avgTransfersPerGw?: FloatFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    lastTransferAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplFixtureCreateInput = {
    id: number
    eventId?: number | null
    teamHId: number
    teamAId: number
    teamHDifficulty: number
    teamADifficulty: number
    kickoffTime?: Date | string | null
    finished: boolean
  }

  export type FplFixtureUncheckedCreateInput = {
    id: number
    eventId?: number | null
    teamHId: number
    teamAId: number
    teamHDifficulty: number
    teamADifficulty: number
    kickoffTime?: Date | string | null
    finished: boolean
  }

  export type FplFixtureUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    teamHId?: IntFieldUpdateOperationsInput | number
    teamAId?: IntFieldUpdateOperationsInput | number
    teamHDifficulty?: IntFieldUpdateOperationsInput | number
    teamADifficulty?: IntFieldUpdateOperationsInput | number
    kickoffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplFixtureUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    teamHId?: IntFieldUpdateOperationsInput | number
    teamAId?: IntFieldUpdateOperationsInput | number
    teamHDifficulty?: IntFieldUpdateOperationsInput | number
    teamADifficulty?: IntFieldUpdateOperationsInput | number
    kickoffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplFixtureCreateManyInput = {
    id: number
    eventId?: number | null
    teamHId: number
    teamAId: number
    teamHDifficulty: number
    teamADifficulty: number
    kickoffTime?: Date | string | null
    finished: boolean
  }

  export type FplFixtureUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    teamHId?: IntFieldUpdateOperationsInput | number
    teamAId?: IntFieldUpdateOperationsInput | number
    teamHDifficulty?: IntFieldUpdateOperationsInput | number
    teamADifficulty?: IntFieldUpdateOperationsInput | number
    kickoffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplFixtureUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    teamHId?: IntFieldUpdateOperationsInput | number
    teamAId?: IntFieldUpdateOperationsInput | number
    teamHDifficulty?: IntFieldUpdateOperationsInput | number
    teamADifficulty?: IntFieldUpdateOperationsInput | number
    kickoffTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FplBootstrapSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
  }

  export type FplBootstrapSnapshotAvgOrderByAggregateInput = {
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
  }

  export type FplBootstrapSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
  }

  export type FplBootstrapSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
  }

  export type FplBootstrapSnapshotSumOrderByAggregateInput = {
    teamsCount?: SortOrder
    playersCount?: SortOrder
    positionsCount?: SortOrder
    gameweeksCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FplPlayerListRelationFilter = {
    every?: FplPlayerWhereInput
    some?: FplPlayerWhereInput
    none?: FplPlayerWhereInput
  }

  export type FplPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FplTeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    code?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplTeamAvgOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
  }

  export type FplTeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    code?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplTeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    code?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplTeamSumOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FplPositionCountOrderByAggregateInput = {
    id?: SortOrder
    shortName?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplPositionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FplPositionMaxOrderByAggregateInput = {
    id?: SortOrder
    shortName?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplPositionMinOrderByAggregateInput = {
    id?: SortOrder
    shortName?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplPositionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FplTeamScalarRelationFilter = {
    is?: FplTeamWhereInput
    isNot?: FplTeamWhereInput
  }

  export type FplPositionScalarRelationFilter = {
    is?: FplPositionWhereInput
    isNot?: FplPositionWhereInput
  }

  export type FplEntryTransferListRelationFilter = {
    every?: FplEntryTransferWhereInput
    some?: FplEntryTransferWhereInput
    none?: FplEntryTransferWhereInput
  }

  export type FplEntryTransferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FplPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    firstName?: SortOrder
    secondName?: SortOrder
    webName?: SortOrder
    nowCost?: SortOrder
    status?: SortOrder
    news?: SortOrder
    selectedByPercent?: SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplPlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    nowCost?: SortOrder
    selectedByPercent?: SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
  }

  export type FplPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    firstName?: SortOrder
    secondName?: SortOrder
    webName?: SortOrder
    nowCost?: SortOrder
    status?: SortOrder
    news?: SortOrder
    selectedByPercent?: SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    firstName?: SortOrder
    secondName?: SortOrder
    webName?: SortOrder
    nowCost?: SortOrder
    status?: SortOrder
    news?: SortOrder
    selectedByPercent?: SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplPlayerSumOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    positionId?: SortOrder
    nowCost?: SortOrder
    selectedByPercent?: SortOrder
    transfersInEvent?: SortOrder
    transfersOutEvent?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FplEntrySnapshotListRelationFilter = {
    every?: FplEntrySnapshotWhereInput
    some?: FplEntrySnapshotWhereInput
    none?: FplEntrySnapshotWhereInput
  }

  export type FplEntrySnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FplGameweekCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    deadlineTime?: SortOrder
    finished?: SortOrder
    isCurrent?: SortOrder
    isNext?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplGameweekAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FplGameweekMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    deadlineTime?: SortOrder
    finished?: SortOrder
    isCurrent?: SortOrder
    isNext?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplGameweekMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    deadlineTime?: SortOrder
    finished?: SortOrder
    isCurrent?: SortOrder
    isNext?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplGameweekSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FplLeagueEntryListRelationFilter = {
    every?: FplLeagueEntryWhereInput
    some?: FplLeagueEntryWhereInput
    none?: FplLeagueEntryWhereInput
  }

  export type FplLeagueEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FplLeagueCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplLeagueAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FplLeagueMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplLeagueMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplLeagueSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FplLeagueScalarRelationFilter = {
    is?: FplLeagueWhereInput
    isNot?: FplLeagueWhereInput
  }

  export type FplEntryBehaviourProfileNullableScalarRelationFilter = {
    is?: FplEntryBehaviourProfileWhereInput | null
    isNot?: FplEntryBehaviourProfileWhereInput | null
  }

  export type FplLeagueEntryCountOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryName?: SortOrder
    playerName?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrder
    totalPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplLeagueEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrder
    totalPoints?: SortOrder
  }

  export type FplLeagueEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryName?: SortOrder
    playerName?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrder
    totalPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplLeagueEntryMinOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryName?: SortOrder
    playerName?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrder
    totalPoints?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplLeagueEntrySumOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    rank?: SortOrder
    lastRank?: SortOrder
    totalPoints?: SortOrder
  }

  export type FplGameweekScalarRelationFilter = {
    is?: FplGameweekWhereInput
    isNot?: FplGameweekWhereInput
  }

  export type FplEntryPickListRelationFilter = {
    every?: FplEntryPickWhereInput
    some?: FplEntryPickWhereInput
    none?: FplEntryPickWhereInput
  }

  export type FplEntryPickOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FplEntrySnapshotLeagueIdEntryIdEventIdCompoundUniqueInput = {
    leagueId: number
    entryId: number
    eventId: number
  }

  export type FplEntrySnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrder
    teamValue?: SortOrder
    eventTransfers?: SortOrder
    eventTransfersCost?: SortOrder
    fetchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplEntrySnapshotAvgOrderByAggregateInput = {
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrder
    teamValue?: SortOrder
    eventTransfers?: SortOrder
    eventTransfersCost?: SortOrder
  }

  export type FplEntrySnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrder
    teamValue?: SortOrder
    eventTransfers?: SortOrder
    eventTransfersCost?: SortOrder
    fetchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplEntrySnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrder
    teamValue?: SortOrder
    eventTransfers?: SortOrder
    eventTransfersCost?: SortOrder
    fetchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplEntrySnapshotSumOrderByAggregateInput = {
    leagueId?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    bank?: SortOrder
    teamValue?: SortOrder
    eventTransfers?: SortOrder
    eventTransfersCost?: SortOrder
  }

  export type FplEntrySnapshotScalarRelationFilter = {
    is?: FplEntrySnapshotWhereInput
    isNot?: FplEntrySnapshotWhereInput
  }

  export type FplEntryPickSnapshotIdPickPositionCompoundUniqueInput = {
    snapshotId: string
    pickPosition: number
  }

  export type FplEntryPickCountOrderByAggregateInput = {
    id?: SortOrder
    snapshotId?: SortOrder
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
    isCaptain?: SortOrder
    isViceCaptain?: SortOrder
  }

  export type FplEntryPickAvgOrderByAggregateInput = {
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
  }

  export type FplEntryPickMaxOrderByAggregateInput = {
    id?: SortOrder
    snapshotId?: SortOrder
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
    isCaptain?: SortOrder
    isViceCaptain?: SortOrder
  }

  export type FplEntryPickMinOrderByAggregateInput = {
    id?: SortOrder
    snapshotId?: SortOrder
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
    isCaptain?: SortOrder
    isViceCaptain?: SortOrder
  }

  export type FplEntryPickSumOrderByAggregateInput = {
    playerId?: SortOrder
    pickPosition?: SortOrder
    multiplier?: SortOrder
  }

  export type FplLeagueEntryScalarRelationFilter = {
    is?: FplLeagueEntryWhereInput
    isNot?: FplLeagueEntryWhereInput
  }

  export type FplPlayerScalarRelationFilter = {
    is?: FplPlayerWhereInput
    isNot?: FplPlayerWhereInput
  }

  export type FplEntryTransferEntryIdEventIdTimePlayerInIdPlayerOutIdCompoundUniqueInput = {
    entryId: number
    eventId: number
    time: Date | string
    playerInId: number
    playerOutId: number
  }

  export type FplEntryTransferCountOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    time?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrder
    bank?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
  }

  export type FplEntryTransferAvgOrderByAggregateInput = {
    entryId?: SortOrder
    eventId?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrder
    bank?: SortOrder
    cost?: SortOrder
  }

  export type FplEntryTransferMaxOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    time?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrder
    bank?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
  }

  export type FplEntryTransferMinOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    eventId?: SortOrder
    time?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrder
    bank?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
  }

  export type FplEntryTransferSumOrderByAggregateInput = {
    entryId?: SortOrder
    eventId?: SortOrder
    playerInId?: SortOrder
    playerOutId?: SortOrder
    value?: SortOrder
    bank?: SortOrder
    cost?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FplEntryBehaviourProfileCountOrderByAggregateInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
    lastTransferAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplEntryBehaviourProfileAvgOrderByAggregateInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
  }

  export type FplEntryBehaviourProfileMaxOrderByAggregateInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
    lastTransferAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplEntryBehaviourProfileMinOrderByAggregateInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
    lastTransferAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FplEntryBehaviourProfileSumOrderByAggregateInput = {
    entryId?: SortOrder
    transfersCount?: SortOrder
    hitsCount?: SortOrder
    totalHitCost?: SortOrder
    avgTransfersPerGw?: SortOrder
    hitRate?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FplFixtureCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
    kickoffTime?: SortOrder
    finished?: SortOrder
  }

  export type FplFixtureAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
  }

  export type FplFixtureMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
    kickoffTime?: SortOrder
    finished?: SortOrder
  }

  export type FplFixtureMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
    kickoffTime?: SortOrder
    finished?: SortOrder
  }

  export type FplFixtureSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    teamHId?: SortOrder
    teamAId?: SortOrder
    teamHDifficulty?: SortOrder
    teamADifficulty?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FplPlayerCreateNestedManyWithoutTeamInput = {
    create?: XOR<FplPlayerCreateWithoutTeamInput, FplPlayerUncheckedCreateWithoutTeamInput> | FplPlayerCreateWithoutTeamInput[] | FplPlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTeamInput | FplPlayerCreateOrConnectWithoutTeamInput[]
    createMany?: FplPlayerCreateManyTeamInputEnvelope
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
  }

  export type FplPlayerUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<FplPlayerCreateWithoutTeamInput, FplPlayerUncheckedCreateWithoutTeamInput> | FplPlayerCreateWithoutTeamInput[] | FplPlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTeamInput | FplPlayerCreateOrConnectWithoutTeamInput[]
    createMany?: FplPlayerCreateManyTeamInputEnvelope
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FplPlayerUpdateManyWithoutTeamNestedInput = {
    create?: XOR<FplPlayerCreateWithoutTeamInput, FplPlayerUncheckedCreateWithoutTeamInput> | FplPlayerCreateWithoutTeamInput[] | FplPlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTeamInput | FplPlayerCreateOrConnectWithoutTeamInput[]
    upsert?: FplPlayerUpsertWithWhereUniqueWithoutTeamInput | FplPlayerUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: FplPlayerCreateManyTeamInputEnvelope
    set?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    disconnect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    delete?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    update?: FplPlayerUpdateWithWhereUniqueWithoutTeamInput | FplPlayerUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: FplPlayerUpdateManyWithWhereWithoutTeamInput | FplPlayerUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: FplPlayerScalarWhereInput | FplPlayerScalarWhereInput[]
  }

  export type FplPlayerUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<FplPlayerCreateWithoutTeamInput, FplPlayerUncheckedCreateWithoutTeamInput> | FplPlayerCreateWithoutTeamInput[] | FplPlayerUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTeamInput | FplPlayerCreateOrConnectWithoutTeamInput[]
    upsert?: FplPlayerUpsertWithWhereUniqueWithoutTeamInput | FplPlayerUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: FplPlayerCreateManyTeamInputEnvelope
    set?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    disconnect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    delete?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    update?: FplPlayerUpdateWithWhereUniqueWithoutTeamInput | FplPlayerUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: FplPlayerUpdateManyWithWhereWithoutTeamInput | FplPlayerUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: FplPlayerScalarWhereInput | FplPlayerScalarWhereInput[]
  }

  export type FplPlayerCreateNestedManyWithoutPositionInput = {
    create?: XOR<FplPlayerCreateWithoutPositionInput, FplPlayerUncheckedCreateWithoutPositionInput> | FplPlayerCreateWithoutPositionInput[] | FplPlayerUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutPositionInput | FplPlayerCreateOrConnectWithoutPositionInput[]
    createMany?: FplPlayerCreateManyPositionInputEnvelope
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
  }

  export type FplPlayerUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<FplPlayerCreateWithoutPositionInput, FplPlayerUncheckedCreateWithoutPositionInput> | FplPlayerCreateWithoutPositionInput[] | FplPlayerUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutPositionInput | FplPlayerCreateOrConnectWithoutPositionInput[]
    createMany?: FplPlayerCreateManyPositionInputEnvelope
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
  }

  export type FplPlayerUpdateManyWithoutPositionNestedInput = {
    create?: XOR<FplPlayerCreateWithoutPositionInput, FplPlayerUncheckedCreateWithoutPositionInput> | FplPlayerCreateWithoutPositionInput[] | FplPlayerUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutPositionInput | FplPlayerCreateOrConnectWithoutPositionInput[]
    upsert?: FplPlayerUpsertWithWhereUniqueWithoutPositionInput | FplPlayerUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: FplPlayerCreateManyPositionInputEnvelope
    set?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    disconnect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    delete?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    update?: FplPlayerUpdateWithWhereUniqueWithoutPositionInput | FplPlayerUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: FplPlayerUpdateManyWithWhereWithoutPositionInput | FplPlayerUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: FplPlayerScalarWhereInput | FplPlayerScalarWhereInput[]
  }

  export type FplPlayerUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<FplPlayerCreateWithoutPositionInput, FplPlayerUncheckedCreateWithoutPositionInput> | FplPlayerCreateWithoutPositionInput[] | FplPlayerUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: FplPlayerCreateOrConnectWithoutPositionInput | FplPlayerCreateOrConnectWithoutPositionInput[]
    upsert?: FplPlayerUpsertWithWhereUniqueWithoutPositionInput | FplPlayerUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: FplPlayerCreateManyPositionInputEnvelope
    set?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    disconnect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    delete?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    connect?: FplPlayerWhereUniqueInput | FplPlayerWhereUniqueInput[]
    update?: FplPlayerUpdateWithWhereUniqueWithoutPositionInput | FplPlayerUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: FplPlayerUpdateManyWithWhereWithoutPositionInput | FplPlayerUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: FplPlayerScalarWhereInput | FplPlayerScalarWhereInput[]
  }

  export type FplTeamCreateNestedOneWithoutPlayersInput = {
    create?: XOR<FplTeamCreateWithoutPlayersInput, FplTeamUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: FplTeamCreateOrConnectWithoutPlayersInput
    connect?: FplTeamWhereUniqueInput
  }

  export type FplPositionCreateNestedOneWithoutPlayersInput = {
    create?: XOR<FplPositionCreateWithoutPlayersInput, FplPositionUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: FplPositionCreateOrConnectWithoutPlayersInput
    connect?: FplPositionWhereUniqueInput
  }

  export type FplEntryTransferCreateNestedManyWithoutPlayerInInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerInInput, FplEntryTransferUncheckedCreateWithoutPlayerInInput> | FplEntryTransferCreateWithoutPlayerInInput[] | FplEntryTransferUncheckedCreateWithoutPlayerInInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerInInput | FplEntryTransferCreateOrConnectWithoutPlayerInInput[]
    createMany?: FplEntryTransferCreateManyPlayerInInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type FplEntryTransferCreateNestedManyWithoutPlayerOutInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerOutInput, FplEntryTransferUncheckedCreateWithoutPlayerOutInput> | FplEntryTransferCreateWithoutPlayerOutInput[] | FplEntryTransferUncheckedCreateWithoutPlayerOutInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerOutInput | FplEntryTransferCreateOrConnectWithoutPlayerOutInput[]
    createMany?: FplEntryTransferCreateManyPlayerOutInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type FplEntryTransferUncheckedCreateNestedManyWithoutPlayerInInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerInInput, FplEntryTransferUncheckedCreateWithoutPlayerInInput> | FplEntryTransferCreateWithoutPlayerInInput[] | FplEntryTransferUncheckedCreateWithoutPlayerInInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerInInput | FplEntryTransferCreateOrConnectWithoutPlayerInInput[]
    createMany?: FplEntryTransferCreateManyPlayerInInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type FplEntryTransferUncheckedCreateNestedManyWithoutPlayerOutInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerOutInput, FplEntryTransferUncheckedCreateWithoutPlayerOutInput> | FplEntryTransferCreateWithoutPlayerOutInput[] | FplEntryTransferUncheckedCreateWithoutPlayerOutInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerOutInput | FplEntryTransferCreateOrConnectWithoutPlayerOutInput[]
    createMany?: FplEntryTransferCreateManyPlayerOutInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FplTeamUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<FplTeamCreateWithoutPlayersInput, FplTeamUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: FplTeamCreateOrConnectWithoutPlayersInput
    upsert?: FplTeamUpsertWithoutPlayersInput
    connect?: FplTeamWhereUniqueInput
    update?: XOR<XOR<FplTeamUpdateToOneWithWhereWithoutPlayersInput, FplTeamUpdateWithoutPlayersInput>, FplTeamUncheckedUpdateWithoutPlayersInput>
  }

  export type FplPositionUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<FplPositionCreateWithoutPlayersInput, FplPositionUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: FplPositionCreateOrConnectWithoutPlayersInput
    upsert?: FplPositionUpsertWithoutPlayersInput
    connect?: FplPositionWhereUniqueInput
    update?: XOR<XOR<FplPositionUpdateToOneWithWhereWithoutPlayersInput, FplPositionUpdateWithoutPlayersInput>, FplPositionUncheckedUpdateWithoutPlayersInput>
  }

  export type FplEntryTransferUpdateManyWithoutPlayerInNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerInInput, FplEntryTransferUncheckedCreateWithoutPlayerInInput> | FplEntryTransferCreateWithoutPlayerInInput[] | FplEntryTransferUncheckedCreateWithoutPlayerInInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerInInput | FplEntryTransferCreateOrConnectWithoutPlayerInInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutPlayerInInput | FplEntryTransferUpsertWithWhereUniqueWithoutPlayerInInput[]
    createMany?: FplEntryTransferCreateManyPlayerInInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutPlayerInInput | FplEntryTransferUpdateWithWhereUniqueWithoutPlayerInInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutPlayerInInput | FplEntryTransferUpdateManyWithWhereWithoutPlayerInInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntryTransferUpdateManyWithoutPlayerOutNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerOutInput, FplEntryTransferUncheckedCreateWithoutPlayerOutInput> | FplEntryTransferCreateWithoutPlayerOutInput[] | FplEntryTransferUncheckedCreateWithoutPlayerOutInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerOutInput | FplEntryTransferCreateOrConnectWithoutPlayerOutInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutPlayerOutInput | FplEntryTransferUpsertWithWhereUniqueWithoutPlayerOutInput[]
    createMany?: FplEntryTransferCreateManyPlayerOutInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutPlayerOutInput | FplEntryTransferUpdateWithWhereUniqueWithoutPlayerOutInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutPlayerOutInput | FplEntryTransferUpdateManyWithWhereWithoutPlayerOutInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutPlayerInNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerInInput, FplEntryTransferUncheckedCreateWithoutPlayerInInput> | FplEntryTransferCreateWithoutPlayerInInput[] | FplEntryTransferUncheckedCreateWithoutPlayerInInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerInInput | FplEntryTransferCreateOrConnectWithoutPlayerInInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutPlayerInInput | FplEntryTransferUpsertWithWhereUniqueWithoutPlayerInInput[]
    createMany?: FplEntryTransferCreateManyPlayerInInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutPlayerInInput | FplEntryTransferUpdateWithWhereUniqueWithoutPlayerInInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutPlayerInInput | FplEntryTransferUpdateManyWithWhereWithoutPlayerInInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutPlayerOutNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutPlayerOutInput, FplEntryTransferUncheckedCreateWithoutPlayerOutInput> | FplEntryTransferCreateWithoutPlayerOutInput[] | FplEntryTransferUncheckedCreateWithoutPlayerOutInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutPlayerOutInput | FplEntryTransferCreateOrConnectWithoutPlayerOutInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutPlayerOutInput | FplEntryTransferUpsertWithWhereUniqueWithoutPlayerOutInput[]
    createMany?: FplEntryTransferCreateManyPlayerOutInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutPlayerOutInput | FplEntryTransferUpdateWithWhereUniqueWithoutPlayerOutInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutPlayerOutInput | FplEntryTransferUpdateManyWithWhereWithoutPlayerOutInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntrySnapshotCreateNestedManyWithoutEventInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutEventInput, FplEntrySnapshotUncheckedCreateWithoutEventInput> | FplEntrySnapshotCreateWithoutEventInput[] | FplEntrySnapshotUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutEventInput | FplEntrySnapshotCreateOrConnectWithoutEventInput[]
    createMany?: FplEntrySnapshotCreateManyEventInputEnvelope
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
  }

  export type FplEntryTransferCreateNestedManyWithoutEventInput = {
    create?: XOR<FplEntryTransferCreateWithoutEventInput, FplEntryTransferUncheckedCreateWithoutEventInput> | FplEntryTransferCreateWithoutEventInput[] | FplEntryTransferUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEventInput | FplEntryTransferCreateOrConnectWithoutEventInput[]
    createMany?: FplEntryTransferCreateManyEventInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type FplEntrySnapshotUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutEventInput, FplEntrySnapshotUncheckedCreateWithoutEventInput> | FplEntrySnapshotCreateWithoutEventInput[] | FplEntrySnapshotUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutEventInput | FplEntrySnapshotCreateOrConnectWithoutEventInput[]
    createMany?: FplEntrySnapshotCreateManyEventInputEnvelope
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
  }

  export type FplEntryTransferUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<FplEntryTransferCreateWithoutEventInput, FplEntryTransferUncheckedCreateWithoutEventInput> | FplEntryTransferCreateWithoutEventInput[] | FplEntryTransferUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEventInput | FplEntryTransferCreateOrConnectWithoutEventInput[]
    createMany?: FplEntryTransferCreateManyEventInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FplEntrySnapshotUpdateManyWithoutEventNestedInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutEventInput, FplEntrySnapshotUncheckedCreateWithoutEventInput> | FplEntrySnapshotCreateWithoutEventInput[] | FplEntrySnapshotUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutEventInput | FplEntrySnapshotCreateOrConnectWithoutEventInput[]
    upsert?: FplEntrySnapshotUpsertWithWhereUniqueWithoutEventInput | FplEntrySnapshotUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: FplEntrySnapshotCreateManyEventInputEnvelope
    set?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    disconnect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    delete?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    update?: FplEntrySnapshotUpdateWithWhereUniqueWithoutEventInput | FplEntrySnapshotUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: FplEntrySnapshotUpdateManyWithWhereWithoutEventInput | FplEntrySnapshotUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: FplEntrySnapshotScalarWhereInput | FplEntrySnapshotScalarWhereInput[]
  }

  export type FplEntryTransferUpdateManyWithoutEventNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutEventInput, FplEntryTransferUncheckedCreateWithoutEventInput> | FplEntryTransferCreateWithoutEventInput[] | FplEntryTransferUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEventInput | FplEntryTransferCreateOrConnectWithoutEventInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutEventInput | FplEntryTransferUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: FplEntryTransferCreateManyEventInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutEventInput | FplEntryTransferUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutEventInput | FplEntryTransferUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntrySnapshotUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutEventInput, FplEntrySnapshotUncheckedCreateWithoutEventInput> | FplEntrySnapshotCreateWithoutEventInput[] | FplEntrySnapshotUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutEventInput | FplEntrySnapshotCreateOrConnectWithoutEventInput[]
    upsert?: FplEntrySnapshotUpsertWithWhereUniqueWithoutEventInput | FplEntrySnapshotUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: FplEntrySnapshotCreateManyEventInputEnvelope
    set?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    disconnect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    delete?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    update?: FplEntrySnapshotUpdateWithWhereUniqueWithoutEventInput | FplEntrySnapshotUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: FplEntrySnapshotUpdateManyWithWhereWithoutEventInput | FplEntrySnapshotUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: FplEntrySnapshotScalarWhereInput | FplEntrySnapshotScalarWhereInput[]
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutEventInput, FplEntryTransferUncheckedCreateWithoutEventInput> | FplEntryTransferCreateWithoutEventInput[] | FplEntryTransferUncheckedCreateWithoutEventInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEventInput | FplEntryTransferCreateOrConnectWithoutEventInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutEventInput | FplEntryTransferUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: FplEntryTransferCreateManyEventInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutEventInput | FplEntryTransferUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutEventInput | FplEntryTransferUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplLeagueEntryCreateNestedManyWithoutLeagueInput = {
    create?: XOR<FplLeagueEntryCreateWithoutLeagueInput, FplLeagueEntryUncheckedCreateWithoutLeagueInput> | FplLeagueEntryCreateWithoutLeagueInput[] | FplLeagueEntryUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutLeagueInput | FplLeagueEntryCreateOrConnectWithoutLeagueInput[]
    createMany?: FplLeagueEntryCreateManyLeagueInputEnvelope
    connect?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
  }

  export type FplEntrySnapshotCreateNestedManyWithoutLeagueInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutLeagueInput, FplEntrySnapshotUncheckedCreateWithoutLeagueInput> | FplEntrySnapshotCreateWithoutLeagueInput[] | FplEntrySnapshotUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutLeagueInput | FplEntrySnapshotCreateOrConnectWithoutLeagueInput[]
    createMany?: FplEntrySnapshotCreateManyLeagueInputEnvelope
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
  }

  export type FplLeagueEntryUncheckedCreateNestedManyWithoutLeagueInput = {
    create?: XOR<FplLeagueEntryCreateWithoutLeagueInput, FplLeagueEntryUncheckedCreateWithoutLeagueInput> | FplLeagueEntryCreateWithoutLeagueInput[] | FplLeagueEntryUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutLeagueInput | FplLeagueEntryCreateOrConnectWithoutLeagueInput[]
    createMany?: FplLeagueEntryCreateManyLeagueInputEnvelope
    connect?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
  }

  export type FplEntrySnapshotUncheckedCreateNestedManyWithoutLeagueInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutLeagueInput, FplEntrySnapshotUncheckedCreateWithoutLeagueInput> | FplEntrySnapshotCreateWithoutLeagueInput[] | FplEntrySnapshotUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutLeagueInput | FplEntrySnapshotCreateOrConnectWithoutLeagueInput[]
    createMany?: FplEntrySnapshotCreateManyLeagueInputEnvelope
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
  }

  export type FplLeagueEntryUpdateManyWithoutLeagueNestedInput = {
    create?: XOR<FplLeagueEntryCreateWithoutLeagueInput, FplLeagueEntryUncheckedCreateWithoutLeagueInput> | FplLeagueEntryCreateWithoutLeagueInput[] | FplLeagueEntryUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutLeagueInput | FplLeagueEntryCreateOrConnectWithoutLeagueInput[]
    upsert?: FplLeagueEntryUpsertWithWhereUniqueWithoutLeagueInput | FplLeagueEntryUpsertWithWhereUniqueWithoutLeagueInput[]
    createMany?: FplLeagueEntryCreateManyLeagueInputEnvelope
    set?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    disconnect?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    delete?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    connect?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    update?: FplLeagueEntryUpdateWithWhereUniqueWithoutLeagueInput | FplLeagueEntryUpdateWithWhereUniqueWithoutLeagueInput[]
    updateMany?: FplLeagueEntryUpdateManyWithWhereWithoutLeagueInput | FplLeagueEntryUpdateManyWithWhereWithoutLeagueInput[]
    deleteMany?: FplLeagueEntryScalarWhereInput | FplLeagueEntryScalarWhereInput[]
  }

  export type FplEntrySnapshotUpdateManyWithoutLeagueNestedInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutLeagueInput, FplEntrySnapshotUncheckedCreateWithoutLeagueInput> | FplEntrySnapshotCreateWithoutLeagueInput[] | FplEntrySnapshotUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutLeagueInput | FplEntrySnapshotCreateOrConnectWithoutLeagueInput[]
    upsert?: FplEntrySnapshotUpsertWithWhereUniqueWithoutLeagueInput | FplEntrySnapshotUpsertWithWhereUniqueWithoutLeagueInput[]
    createMany?: FplEntrySnapshotCreateManyLeagueInputEnvelope
    set?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    disconnect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    delete?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    update?: FplEntrySnapshotUpdateWithWhereUniqueWithoutLeagueInput | FplEntrySnapshotUpdateWithWhereUniqueWithoutLeagueInput[]
    updateMany?: FplEntrySnapshotUpdateManyWithWhereWithoutLeagueInput | FplEntrySnapshotUpdateManyWithWhereWithoutLeagueInput[]
    deleteMany?: FplEntrySnapshotScalarWhereInput | FplEntrySnapshotScalarWhereInput[]
  }

  export type FplLeagueEntryUncheckedUpdateManyWithoutLeagueNestedInput = {
    create?: XOR<FplLeagueEntryCreateWithoutLeagueInput, FplLeagueEntryUncheckedCreateWithoutLeagueInput> | FplLeagueEntryCreateWithoutLeagueInput[] | FplLeagueEntryUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutLeagueInput | FplLeagueEntryCreateOrConnectWithoutLeagueInput[]
    upsert?: FplLeagueEntryUpsertWithWhereUniqueWithoutLeagueInput | FplLeagueEntryUpsertWithWhereUniqueWithoutLeagueInput[]
    createMany?: FplLeagueEntryCreateManyLeagueInputEnvelope
    set?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    disconnect?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    delete?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    connect?: FplLeagueEntryWhereUniqueInput | FplLeagueEntryWhereUniqueInput[]
    update?: FplLeagueEntryUpdateWithWhereUniqueWithoutLeagueInput | FplLeagueEntryUpdateWithWhereUniqueWithoutLeagueInput[]
    updateMany?: FplLeagueEntryUpdateManyWithWhereWithoutLeagueInput | FplLeagueEntryUpdateManyWithWhereWithoutLeagueInput[]
    deleteMany?: FplLeagueEntryScalarWhereInput | FplLeagueEntryScalarWhereInput[]
  }

  export type FplEntrySnapshotUncheckedUpdateManyWithoutLeagueNestedInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutLeagueInput, FplEntrySnapshotUncheckedCreateWithoutLeagueInput> | FplEntrySnapshotCreateWithoutLeagueInput[] | FplEntrySnapshotUncheckedCreateWithoutLeagueInput[]
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutLeagueInput | FplEntrySnapshotCreateOrConnectWithoutLeagueInput[]
    upsert?: FplEntrySnapshotUpsertWithWhereUniqueWithoutLeagueInput | FplEntrySnapshotUpsertWithWhereUniqueWithoutLeagueInput[]
    createMany?: FplEntrySnapshotCreateManyLeagueInputEnvelope
    set?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    disconnect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    delete?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    connect?: FplEntrySnapshotWhereUniqueInput | FplEntrySnapshotWhereUniqueInput[]
    update?: FplEntrySnapshotUpdateWithWhereUniqueWithoutLeagueInput | FplEntrySnapshotUpdateWithWhereUniqueWithoutLeagueInput[]
    updateMany?: FplEntrySnapshotUpdateManyWithWhereWithoutLeagueInput | FplEntrySnapshotUpdateManyWithWhereWithoutLeagueInput[]
    deleteMany?: FplEntrySnapshotScalarWhereInput | FplEntrySnapshotScalarWhereInput[]
  }

  export type FplLeagueCreateNestedOneWithoutEntriesInput = {
    create?: XOR<FplLeagueCreateWithoutEntriesInput, FplLeagueUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: FplLeagueCreateOrConnectWithoutEntriesInput
    connect?: FplLeagueWhereUniqueInput
  }

  export type FplEntryTransferCreateNestedManyWithoutEntryInput = {
    create?: XOR<FplEntryTransferCreateWithoutEntryInput, FplEntryTransferUncheckedCreateWithoutEntryInput> | FplEntryTransferCreateWithoutEntryInput[] | FplEntryTransferUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEntryInput | FplEntryTransferCreateOrConnectWithoutEntryInput[]
    createMany?: FplEntryTransferCreateManyEntryInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type FplEntryBehaviourProfileCreateNestedOneWithoutEntryInput = {
    create?: XOR<FplEntryBehaviourProfileCreateWithoutEntryInput, FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput>
    connectOrCreate?: FplEntryBehaviourProfileCreateOrConnectWithoutEntryInput
    connect?: FplEntryBehaviourProfileWhereUniqueInput
  }

  export type FplEntryTransferUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<FplEntryTransferCreateWithoutEntryInput, FplEntryTransferUncheckedCreateWithoutEntryInput> | FplEntryTransferCreateWithoutEntryInput[] | FplEntryTransferUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEntryInput | FplEntryTransferCreateOrConnectWithoutEntryInput[]
    createMany?: FplEntryTransferCreateManyEntryInputEnvelope
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
  }

  export type FplEntryBehaviourProfileUncheckedCreateNestedOneWithoutEntryInput = {
    create?: XOR<FplEntryBehaviourProfileCreateWithoutEntryInput, FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput>
    connectOrCreate?: FplEntryBehaviourProfileCreateOrConnectWithoutEntryInput
    connect?: FplEntryBehaviourProfileWhereUniqueInput
  }

  export type FplLeagueUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<FplLeagueCreateWithoutEntriesInput, FplLeagueUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: FplLeagueCreateOrConnectWithoutEntriesInput
    upsert?: FplLeagueUpsertWithoutEntriesInput
    connect?: FplLeagueWhereUniqueInput
    update?: XOR<XOR<FplLeagueUpdateToOneWithWhereWithoutEntriesInput, FplLeagueUpdateWithoutEntriesInput>, FplLeagueUncheckedUpdateWithoutEntriesInput>
  }

  export type FplEntryTransferUpdateManyWithoutEntryNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutEntryInput, FplEntryTransferUncheckedCreateWithoutEntryInput> | FplEntryTransferCreateWithoutEntryInput[] | FplEntryTransferUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEntryInput | FplEntryTransferCreateOrConnectWithoutEntryInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutEntryInput | FplEntryTransferUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: FplEntryTransferCreateManyEntryInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutEntryInput | FplEntryTransferUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutEntryInput | FplEntryTransferUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntryBehaviourProfileUpdateOneWithoutEntryNestedInput = {
    create?: XOR<FplEntryBehaviourProfileCreateWithoutEntryInput, FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput>
    connectOrCreate?: FplEntryBehaviourProfileCreateOrConnectWithoutEntryInput
    upsert?: FplEntryBehaviourProfileUpsertWithoutEntryInput
    disconnect?: FplEntryBehaviourProfileWhereInput | boolean
    delete?: FplEntryBehaviourProfileWhereInput | boolean
    connect?: FplEntryBehaviourProfileWhereUniqueInput
    update?: XOR<XOR<FplEntryBehaviourProfileUpdateToOneWithWhereWithoutEntryInput, FplEntryBehaviourProfileUpdateWithoutEntryInput>, FplEntryBehaviourProfileUncheckedUpdateWithoutEntryInput>
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<FplEntryTransferCreateWithoutEntryInput, FplEntryTransferUncheckedCreateWithoutEntryInput> | FplEntryTransferCreateWithoutEntryInput[] | FplEntryTransferUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FplEntryTransferCreateOrConnectWithoutEntryInput | FplEntryTransferCreateOrConnectWithoutEntryInput[]
    upsert?: FplEntryTransferUpsertWithWhereUniqueWithoutEntryInput | FplEntryTransferUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: FplEntryTransferCreateManyEntryInputEnvelope
    set?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    disconnect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    delete?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    connect?: FplEntryTransferWhereUniqueInput | FplEntryTransferWhereUniqueInput[]
    update?: FplEntryTransferUpdateWithWhereUniqueWithoutEntryInput | FplEntryTransferUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: FplEntryTransferUpdateManyWithWhereWithoutEntryInput | FplEntryTransferUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
  }

  export type FplEntryBehaviourProfileUncheckedUpdateOneWithoutEntryNestedInput = {
    create?: XOR<FplEntryBehaviourProfileCreateWithoutEntryInput, FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput>
    connectOrCreate?: FplEntryBehaviourProfileCreateOrConnectWithoutEntryInput
    upsert?: FplEntryBehaviourProfileUpsertWithoutEntryInput
    disconnect?: FplEntryBehaviourProfileWhereInput | boolean
    delete?: FplEntryBehaviourProfileWhereInput | boolean
    connect?: FplEntryBehaviourProfileWhereUniqueInput
    update?: XOR<XOR<FplEntryBehaviourProfileUpdateToOneWithWhereWithoutEntryInput, FplEntryBehaviourProfileUpdateWithoutEntryInput>, FplEntryBehaviourProfileUncheckedUpdateWithoutEntryInput>
  }

  export type FplLeagueCreateNestedOneWithoutEntrySnapshotsInput = {
    create?: XOR<FplLeagueCreateWithoutEntrySnapshotsInput, FplLeagueUncheckedCreateWithoutEntrySnapshotsInput>
    connectOrCreate?: FplLeagueCreateOrConnectWithoutEntrySnapshotsInput
    connect?: FplLeagueWhereUniqueInput
  }

  export type FplGameweekCreateNestedOneWithoutEntrySnapshotsInput = {
    create?: XOR<FplGameweekCreateWithoutEntrySnapshotsInput, FplGameweekUncheckedCreateWithoutEntrySnapshotsInput>
    connectOrCreate?: FplGameweekCreateOrConnectWithoutEntrySnapshotsInput
    connect?: FplGameweekWhereUniqueInput
  }

  export type FplEntryPickCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<FplEntryPickCreateWithoutSnapshotInput, FplEntryPickUncheckedCreateWithoutSnapshotInput> | FplEntryPickCreateWithoutSnapshotInput[] | FplEntryPickUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: FplEntryPickCreateOrConnectWithoutSnapshotInput | FplEntryPickCreateOrConnectWithoutSnapshotInput[]
    createMany?: FplEntryPickCreateManySnapshotInputEnvelope
    connect?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
  }

  export type FplEntryPickUncheckedCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<FplEntryPickCreateWithoutSnapshotInput, FplEntryPickUncheckedCreateWithoutSnapshotInput> | FplEntryPickCreateWithoutSnapshotInput[] | FplEntryPickUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: FplEntryPickCreateOrConnectWithoutSnapshotInput | FplEntryPickCreateOrConnectWithoutSnapshotInput[]
    createMany?: FplEntryPickCreateManySnapshotInputEnvelope
    connect?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
  }

  export type FplLeagueUpdateOneRequiredWithoutEntrySnapshotsNestedInput = {
    create?: XOR<FplLeagueCreateWithoutEntrySnapshotsInput, FplLeagueUncheckedCreateWithoutEntrySnapshotsInput>
    connectOrCreate?: FplLeagueCreateOrConnectWithoutEntrySnapshotsInput
    upsert?: FplLeagueUpsertWithoutEntrySnapshotsInput
    connect?: FplLeagueWhereUniqueInput
    update?: XOR<XOR<FplLeagueUpdateToOneWithWhereWithoutEntrySnapshotsInput, FplLeagueUpdateWithoutEntrySnapshotsInput>, FplLeagueUncheckedUpdateWithoutEntrySnapshotsInput>
  }

  export type FplGameweekUpdateOneRequiredWithoutEntrySnapshotsNestedInput = {
    create?: XOR<FplGameweekCreateWithoutEntrySnapshotsInput, FplGameweekUncheckedCreateWithoutEntrySnapshotsInput>
    connectOrCreate?: FplGameweekCreateOrConnectWithoutEntrySnapshotsInput
    upsert?: FplGameweekUpsertWithoutEntrySnapshotsInput
    connect?: FplGameweekWhereUniqueInput
    update?: XOR<XOR<FplGameweekUpdateToOneWithWhereWithoutEntrySnapshotsInput, FplGameweekUpdateWithoutEntrySnapshotsInput>, FplGameweekUncheckedUpdateWithoutEntrySnapshotsInput>
  }

  export type FplEntryPickUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<FplEntryPickCreateWithoutSnapshotInput, FplEntryPickUncheckedCreateWithoutSnapshotInput> | FplEntryPickCreateWithoutSnapshotInput[] | FplEntryPickUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: FplEntryPickCreateOrConnectWithoutSnapshotInput | FplEntryPickCreateOrConnectWithoutSnapshotInput[]
    upsert?: FplEntryPickUpsertWithWhereUniqueWithoutSnapshotInput | FplEntryPickUpsertWithWhereUniqueWithoutSnapshotInput[]
    createMany?: FplEntryPickCreateManySnapshotInputEnvelope
    set?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    disconnect?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    delete?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    connect?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    update?: FplEntryPickUpdateWithWhereUniqueWithoutSnapshotInput | FplEntryPickUpdateWithWhereUniqueWithoutSnapshotInput[]
    updateMany?: FplEntryPickUpdateManyWithWhereWithoutSnapshotInput | FplEntryPickUpdateManyWithWhereWithoutSnapshotInput[]
    deleteMany?: FplEntryPickScalarWhereInput | FplEntryPickScalarWhereInput[]
  }

  export type FplEntryPickUncheckedUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<FplEntryPickCreateWithoutSnapshotInput, FplEntryPickUncheckedCreateWithoutSnapshotInput> | FplEntryPickCreateWithoutSnapshotInput[] | FplEntryPickUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: FplEntryPickCreateOrConnectWithoutSnapshotInput | FplEntryPickCreateOrConnectWithoutSnapshotInput[]
    upsert?: FplEntryPickUpsertWithWhereUniqueWithoutSnapshotInput | FplEntryPickUpsertWithWhereUniqueWithoutSnapshotInput[]
    createMany?: FplEntryPickCreateManySnapshotInputEnvelope
    set?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    disconnect?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    delete?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    connect?: FplEntryPickWhereUniqueInput | FplEntryPickWhereUniqueInput[]
    update?: FplEntryPickUpdateWithWhereUniqueWithoutSnapshotInput | FplEntryPickUpdateWithWhereUniqueWithoutSnapshotInput[]
    updateMany?: FplEntryPickUpdateManyWithWhereWithoutSnapshotInput | FplEntryPickUpdateManyWithWhereWithoutSnapshotInput[]
    deleteMany?: FplEntryPickScalarWhereInput | FplEntryPickScalarWhereInput[]
  }

  export type FplEntrySnapshotCreateNestedOneWithoutPicksInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutPicksInput, FplEntrySnapshotUncheckedCreateWithoutPicksInput>
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutPicksInput
    connect?: FplEntrySnapshotWhereUniqueInput
  }

  export type FplEntrySnapshotUpdateOneRequiredWithoutPicksNestedInput = {
    create?: XOR<FplEntrySnapshotCreateWithoutPicksInput, FplEntrySnapshotUncheckedCreateWithoutPicksInput>
    connectOrCreate?: FplEntrySnapshotCreateOrConnectWithoutPicksInput
    upsert?: FplEntrySnapshotUpsertWithoutPicksInput
    connect?: FplEntrySnapshotWhereUniqueInput
    update?: XOR<XOR<FplEntrySnapshotUpdateToOneWithWhereWithoutPicksInput, FplEntrySnapshotUpdateWithoutPicksInput>, FplEntrySnapshotUncheckedUpdateWithoutPicksInput>
  }

  export type FplLeagueEntryCreateNestedOneWithoutTransfersInput = {
    create?: XOR<FplLeagueEntryCreateWithoutTransfersInput, FplLeagueEntryUncheckedCreateWithoutTransfersInput>
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutTransfersInput
    connect?: FplLeagueEntryWhereUniqueInput
  }

  export type FplGameweekCreateNestedOneWithoutEntryTransfersInput = {
    create?: XOR<FplGameweekCreateWithoutEntryTransfersInput, FplGameweekUncheckedCreateWithoutEntryTransfersInput>
    connectOrCreate?: FplGameweekCreateOrConnectWithoutEntryTransfersInput
    connect?: FplGameweekWhereUniqueInput
  }

  export type FplPlayerCreateNestedOneWithoutTransfersInInput = {
    create?: XOR<FplPlayerCreateWithoutTransfersInInput, FplPlayerUncheckedCreateWithoutTransfersInInput>
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTransfersInInput
    connect?: FplPlayerWhereUniqueInput
  }

  export type FplPlayerCreateNestedOneWithoutTransfersOutInput = {
    create?: XOR<FplPlayerCreateWithoutTransfersOutInput, FplPlayerUncheckedCreateWithoutTransfersOutInput>
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTransfersOutInput
    connect?: FplPlayerWhereUniqueInput
  }

  export type FplLeagueEntryUpdateOneRequiredWithoutTransfersNestedInput = {
    create?: XOR<FplLeagueEntryCreateWithoutTransfersInput, FplLeagueEntryUncheckedCreateWithoutTransfersInput>
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutTransfersInput
    upsert?: FplLeagueEntryUpsertWithoutTransfersInput
    connect?: FplLeagueEntryWhereUniqueInput
    update?: XOR<XOR<FplLeagueEntryUpdateToOneWithWhereWithoutTransfersInput, FplLeagueEntryUpdateWithoutTransfersInput>, FplLeagueEntryUncheckedUpdateWithoutTransfersInput>
  }

  export type FplGameweekUpdateOneRequiredWithoutEntryTransfersNestedInput = {
    create?: XOR<FplGameweekCreateWithoutEntryTransfersInput, FplGameweekUncheckedCreateWithoutEntryTransfersInput>
    connectOrCreate?: FplGameweekCreateOrConnectWithoutEntryTransfersInput
    upsert?: FplGameweekUpsertWithoutEntryTransfersInput
    connect?: FplGameweekWhereUniqueInput
    update?: XOR<XOR<FplGameweekUpdateToOneWithWhereWithoutEntryTransfersInput, FplGameweekUpdateWithoutEntryTransfersInput>, FplGameweekUncheckedUpdateWithoutEntryTransfersInput>
  }

  export type FplPlayerUpdateOneRequiredWithoutTransfersInNestedInput = {
    create?: XOR<FplPlayerCreateWithoutTransfersInInput, FplPlayerUncheckedCreateWithoutTransfersInInput>
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTransfersInInput
    upsert?: FplPlayerUpsertWithoutTransfersInInput
    connect?: FplPlayerWhereUniqueInput
    update?: XOR<XOR<FplPlayerUpdateToOneWithWhereWithoutTransfersInInput, FplPlayerUpdateWithoutTransfersInInput>, FplPlayerUncheckedUpdateWithoutTransfersInInput>
  }

  export type FplPlayerUpdateOneRequiredWithoutTransfersOutNestedInput = {
    create?: XOR<FplPlayerCreateWithoutTransfersOutInput, FplPlayerUncheckedCreateWithoutTransfersOutInput>
    connectOrCreate?: FplPlayerCreateOrConnectWithoutTransfersOutInput
    upsert?: FplPlayerUpsertWithoutTransfersOutInput
    connect?: FplPlayerWhereUniqueInput
    update?: XOR<XOR<FplPlayerUpdateToOneWithWhereWithoutTransfersOutInput, FplPlayerUpdateWithoutTransfersOutInput>, FplPlayerUncheckedUpdateWithoutTransfersOutInput>
  }

  export type FplLeagueEntryCreateNestedOneWithoutBehaviourProfileInput = {
    create?: XOR<FplLeagueEntryCreateWithoutBehaviourProfileInput, FplLeagueEntryUncheckedCreateWithoutBehaviourProfileInput>
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutBehaviourProfileInput
    connect?: FplLeagueEntryWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FplLeagueEntryUpdateOneRequiredWithoutBehaviourProfileNestedInput = {
    create?: XOR<FplLeagueEntryCreateWithoutBehaviourProfileInput, FplLeagueEntryUncheckedCreateWithoutBehaviourProfileInput>
    connectOrCreate?: FplLeagueEntryCreateOrConnectWithoutBehaviourProfileInput
    upsert?: FplLeagueEntryUpsertWithoutBehaviourProfileInput
    connect?: FplLeagueEntryWhereUniqueInput
    update?: XOR<XOR<FplLeagueEntryUpdateToOneWithWhereWithoutBehaviourProfileInput, FplLeagueEntryUpdateWithoutBehaviourProfileInput>, FplLeagueEntryUncheckedUpdateWithoutBehaviourProfileInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FplPlayerCreateWithoutTeamInput = {
    id: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    position: FplPositionCreateNestedOneWithoutPlayersInput
    transfersIn?: FplEntryTransferCreateNestedManyWithoutPlayerInInput
    transfersOut?: FplEntryTransferCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerUncheckedCreateWithoutTeamInput = {
    id: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    transfersIn?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerInInput
    transfersOut?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerCreateOrConnectWithoutTeamInput = {
    where: FplPlayerWhereUniqueInput
    create: XOR<FplPlayerCreateWithoutTeamInput, FplPlayerUncheckedCreateWithoutTeamInput>
  }

  export type FplPlayerCreateManyTeamInputEnvelope = {
    data: FplPlayerCreateManyTeamInput | FplPlayerCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type FplPlayerUpsertWithWhereUniqueWithoutTeamInput = {
    where: FplPlayerWhereUniqueInput
    update: XOR<FplPlayerUpdateWithoutTeamInput, FplPlayerUncheckedUpdateWithoutTeamInput>
    create: XOR<FplPlayerCreateWithoutTeamInput, FplPlayerUncheckedCreateWithoutTeamInput>
  }

  export type FplPlayerUpdateWithWhereUniqueWithoutTeamInput = {
    where: FplPlayerWhereUniqueInput
    data: XOR<FplPlayerUpdateWithoutTeamInput, FplPlayerUncheckedUpdateWithoutTeamInput>
  }

  export type FplPlayerUpdateManyWithWhereWithoutTeamInput = {
    where: FplPlayerScalarWhereInput
    data: XOR<FplPlayerUpdateManyMutationInput, FplPlayerUncheckedUpdateManyWithoutTeamInput>
  }

  export type FplPlayerScalarWhereInput = {
    AND?: FplPlayerScalarWhereInput | FplPlayerScalarWhereInput[]
    OR?: FplPlayerScalarWhereInput[]
    NOT?: FplPlayerScalarWhereInput | FplPlayerScalarWhereInput[]
    id?: IntFilter<"FplPlayer"> | number
    teamId?: IntFilter<"FplPlayer"> | number
    positionId?: IntFilter<"FplPlayer"> | number
    firstName?: StringFilter<"FplPlayer"> | string
    secondName?: StringFilter<"FplPlayer"> | string
    webName?: StringFilter<"FplPlayer"> | string
    nowCost?: IntFilter<"FplPlayer"> | number
    status?: StringFilter<"FplPlayer"> | string
    news?: StringNullableFilter<"FplPlayer"> | string | null
    selectedByPercent?: FloatNullableFilter<"FplPlayer"> | number | null
    transfersInEvent?: IntFilter<"FplPlayer"> | number
    transfersOutEvent?: IntFilter<"FplPlayer"> | number
    updatedAt?: DateTimeFilter<"FplPlayer"> | Date | string
  }

  export type FplPlayerCreateWithoutPositionInput = {
    id: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    team: FplTeamCreateNestedOneWithoutPlayersInput
    transfersIn?: FplEntryTransferCreateNestedManyWithoutPlayerInInput
    transfersOut?: FplEntryTransferCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerUncheckedCreateWithoutPositionInput = {
    id: number
    teamId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    transfersIn?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerInInput
    transfersOut?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerCreateOrConnectWithoutPositionInput = {
    where: FplPlayerWhereUniqueInput
    create: XOR<FplPlayerCreateWithoutPositionInput, FplPlayerUncheckedCreateWithoutPositionInput>
  }

  export type FplPlayerCreateManyPositionInputEnvelope = {
    data: FplPlayerCreateManyPositionInput | FplPlayerCreateManyPositionInput[]
    skipDuplicates?: boolean
  }

  export type FplPlayerUpsertWithWhereUniqueWithoutPositionInput = {
    where: FplPlayerWhereUniqueInput
    update: XOR<FplPlayerUpdateWithoutPositionInput, FplPlayerUncheckedUpdateWithoutPositionInput>
    create: XOR<FplPlayerCreateWithoutPositionInput, FplPlayerUncheckedCreateWithoutPositionInput>
  }

  export type FplPlayerUpdateWithWhereUniqueWithoutPositionInput = {
    where: FplPlayerWhereUniqueInput
    data: XOR<FplPlayerUpdateWithoutPositionInput, FplPlayerUncheckedUpdateWithoutPositionInput>
  }

  export type FplPlayerUpdateManyWithWhereWithoutPositionInput = {
    where: FplPlayerScalarWhereInput
    data: XOR<FplPlayerUpdateManyMutationInput, FplPlayerUncheckedUpdateManyWithoutPositionInput>
  }

  export type FplTeamCreateWithoutPlayersInput = {
    id: number
    name: string
    shortName: string
    code?: number | null
    updatedAt?: Date | string
  }

  export type FplTeamUncheckedCreateWithoutPlayersInput = {
    id: number
    name: string
    shortName: string
    code?: number | null
    updatedAt?: Date | string
  }

  export type FplTeamCreateOrConnectWithoutPlayersInput = {
    where: FplTeamWhereUniqueInput
    create: XOR<FplTeamCreateWithoutPlayersInput, FplTeamUncheckedCreateWithoutPlayersInput>
  }

  export type FplPositionCreateWithoutPlayersInput = {
    id: number
    shortName: string
    updatedAt?: Date | string
  }

  export type FplPositionUncheckedCreateWithoutPlayersInput = {
    id: number
    shortName: string
    updatedAt?: Date | string
  }

  export type FplPositionCreateOrConnectWithoutPlayersInput = {
    where: FplPositionWhereUniqueInput
    create: XOR<FplPositionCreateWithoutPlayersInput, FplPositionUncheckedCreateWithoutPlayersInput>
  }

  export type FplEntryTransferCreateWithoutPlayerInInput = {
    id?: string
    time: Date | string
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
    entry: FplLeagueEntryCreateNestedOneWithoutTransfersInput
    event: FplGameweekCreateNestedOneWithoutEntryTransfersInput
    playerOut: FplPlayerCreateNestedOneWithoutTransfersOutInput
  }

  export type FplEntryTransferUncheckedCreateWithoutPlayerInInput = {
    id?: string
    entryId: number
    eventId: number
    time: Date | string
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferCreateOrConnectWithoutPlayerInInput = {
    where: FplEntryTransferWhereUniqueInput
    create: XOR<FplEntryTransferCreateWithoutPlayerInInput, FplEntryTransferUncheckedCreateWithoutPlayerInInput>
  }

  export type FplEntryTransferCreateManyPlayerInInputEnvelope = {
    data: FplEntryTransferCreateManyPlayerInInput | FplEntryTransferCreateManyPlayerInInput[]
    skipDuplicates?: boolean
  }

  export type FplEntryTransferCreateWithoutPlayerOutInput = {
    id?: string
    time: Date | string
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
    entry: FplLeagueEntryCreateNestedOneWithoutTransfersInput
    event: FplGameweekCreateNestedOneWithoutEntryTransfersInput
    playerIn: FplPlayerCreateNestedOneWithoutTransfersInInput
  }

  export type FplEntryTransferUncheckedCreateWithoutPlayerOutInput = {
    id?: string
    entryId: number
    eventId: number
    time: Date | string
    playerInId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferCreateOrConnectWithoutPlayerOutInput = {
    where: FplEntryTransferWhereUniqueInput
    create: XOR<FplEntryTransferCreateWithoutPlayerOutInput, FplEntryTransferUncheckedCreateWithoutPlayerOutInput>
  }

  export type FplEntryTransferCreateManyPlayerOutInputEnvelope = {
    data: FplEntryTransferCreateManyPlayerOutInput | FplEntryTransferCreateManyPlayerOutInput[]
    skipDuplicates?: boolean
  }

  export type FplTeamUpsertWithoutPlayersInput = {
    update: XOR<FplTeamUpdateWithoutPlayersInput, FplTeamUncheckedUpdateWithoutPlayersInput>
    create: XOR<FplTeamCreateWithoutPlayersInput, FplTeamUncheckedCreateWithoutPlayersInput>
    where?: FplTeamWhereInput
  }

  export type FplTeamUpdateToOneWithWhereWithoutPlayersInput = {
    where?: FplTeamWhereInput
    data: XOR<FplTeamUpdateWithoutPlayersInput, FplTeamUncheckedUpdateWithoutPlayersInput>
  }

  export type FplTeamUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    code?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplTeamUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    code?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPositionUpsertWithoutPlayersInput = {
    update: XOR<FplPositionUpdateWithoutPlayersInput, FplPositionUncheckedUpdateWithoutPlayersInput>
    create: XOR<FplPositionCreateWithoutPlayersInput, FplPositionUncheckedCreateWithoutPlayersInput>
    where?: FplPositionWhereInput
  }

  export type FplPositionUpdateToOneWithWhereWithoutPlayersInput = {
    where?: FplPositionWhereInput
    data: XOR<FplPositionUpdateWithoutPlayersInput, FplPositionUncheckedUpdateWithoutPlayersInput>
  }

  export type FplPositionUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    shortName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPositionUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    shortName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUpsertWithWhereUniqueWithoutPlayerInInput = {
    where: FplEntryTransferWhereUniqueInput
    update: XOR<FplEntryTransferUpdateWithoutPlayerInInput, FplEntryTransferUncheckedUpdateWithoutPlayerInInput>
    create: XOR<FplEntryTransferCreateWithoutPlayerInInput, FplEntryTransferUncheckedCreateWithoutPlayerInInput>
  }

  export type FplEntryTransferUpdateWithWhereUniqueWithoutPlayerInInput = {
    where: FplEntryTransferWhereUniqueInput
    data: XOR<FplEntryTransferUpdateWithoutPlayerInInput, FplEntryTransferUncheckedUpdateWithoutPlayerInInput>
  }

  export type FplEntryTransferUpdateManyWithWhereWithoutPlayerInInput = {
    where: FplEntryTransferScalarWhereInput
    data: XOR<FplEntryTransferUpdateManyMutationInput, FplEntryTransferUncheckedUpdateManyWithoutPlayerInInput>
  }

  export type FplEntryTransferScalarWhereInput = {
    AND?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
    OR?: FplEntryTransferScalarWhereInput[]
    NOT?: FplEntryTransferScalarWhereInput | FplEntryTransferScalarWhereInput[]
    id?: StringFilter<"FplEntryTransfer"> | string
    entryId?: IntFilter<"FplEntryTransfer"> | number
    eventId?: IntFilter<"FplEntryTransfer"> | number
    time?: DateTimeFilter<"FplEntryTransfer"> | Date | string
    playerInId?: IntFilter<"FplEntryTransfer"> | number
    playerOutId?: IntFilter<"FplEntryTransfer"> | number
    value?: IntNullableFilter<"FplEntryTransfer"> | number | null
    bank?: IntNullableFilter<"FplEntryTransfer"> | number | null
    cost?: IntNullableFilter<"FplEntryTransfer"> | number | null
    createdAt?: DateTimeFilter<"FplEntryTransfer"> | Date | string
  }

  export type FplEntryTransferUpsertWithWhereUniqueWithoutPlayerOutInput = {
    where: FplEntryTransferWhereUniqueInput
    update: XOR<FplEntryTransferUpdateWithoutPlayerOutInput, FplEntryTransferUncheckedUpdateWithoutPlayerOutInput>
    create: XOR<FplEntryTransferCreateWithoutPlayerOutInput, FplEntryTransferUncheckedCreateWithoutPlayerOutInput>
  }

  export type FplEntryTransferUpdateWithWhereUniqueWithoutPlayerOutInput = {
    where: FplEntryTransferWhereUniqueInput
    data: XOR<FplEntryTransferUpdateWithoutPlayerOutInput, FplEntryTransferUncheckedUpdateWithoutPlayerOutInput>
  }

  export type FplEntryTransferUpdateManyWithWhereWithoutPlayerOutInput = {
    where: FplEntryTransferScalarWhereInput
    data: XOR<FplEntryTransferUpdateManyMutationInput, FplEntryTransferUncheckedUpdateManyWithoutPlayerOutInput>
  }

  export type FplEntrySnapshotCreateWithoutEventInput = {
    id?: string
    entryId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    league: FplLeagueCreateNestedOneWithoutEntrySnapshotsInput
    picks?: FplEntryPickCreateNestedManyWithoutSnapshotInput
  }

  export type FplEntrySnapshotUncheckedCreateWithoutEventInput = {
    id?: string
    leagueId: number
    entryId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    picks?: FplEntryPickUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type FplEntrySnapshotCreateOrConnectWithoutEventInput = {
    where: FplEntrySnapshotWhereUniqueInput
    create: XOR<FplEntrySnapshotCreateWithoutEventInput, FplEntrySnapshotUncheckedCreateWithoutEventInput>
  }

  export type FplEntrySnapshotCreateManyEventInputEnvelope = {
    data: FplEntrySnapshotCreateManyEventInput | FplEntrySnapshotCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type FplEntryTransferCreateWithoutEventInput = {
    id?: string
    time: Date | string
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
    entry: FplLeagueEntryCreateNestedOneWithoutTransfersInput
    playerIn: FplPlayerCreateNestedOneWithoutTransfersInInput
    playerOut: FplPlayerCreateNestedOneWithoutTransfersOutInput
  }

  export type FplEntryTransferUncheckedCreateWithoutEventInput = {
    id?: string
    entryId: number
    time: Date | string
    playerInId: number
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferCreateOrConnectWithoutEventInput = {
    where: FplEntryTransferWhereUniqueInput
    create: XOR<FplEntryTransferCreateWithoutEventInput, FplEntryTransferUncheckedCreateWithoutEventInput>
  }

  export type FplEntryTransferCreateManyEventInputEnvelope = {
    data: FplEntryTransferCreateManyEventInput | FplEntryTransferCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type FplEntrySnapshotUpsertWithWhereUniqueWithoutEventInput = {
    where: FplEntrySnapshotWhereUniqueInput
    update: XOR<FplEntrySnapshotUpdateWithoutEventInput, FplEntrySnapshotUncheckedUpdateWithoutEventInput>
    create: XOR<FplEntrySnapshotCreateWithoutEventInput, FplEntrySnapshotUncheckedCreateWithoutEventInput>
  }

  export type FplEntrySnapshotUpdateWithWhereUniqueWithoutEventInput = {
    where: FplEntrySnapshotWhereUniqueInput
    data: XOR<FplEntrySnapshotUpdateWithoutEventInput, FplEntrySnapshotUncheckedUpdateWithoutEventInput>
  }

  export type FplEntrySnapshotUpdateManyWithWhereWithoutEventInput = {
    where: FplEntrySnapshotScalarWhereInput
    data: XOR<FplEntrySnapshotUpdateManyMutationInput, FplEntrySnapshotUncheckedUpdateManyWithoutEventInput>
  }

  export type FplEntrySnapshotScalarWhereInput = {
    AND?: FplEntrySnapshotScalarWhereInput | FplEntrySnapshotScalarWhereInput[]
    OR?: FplEntrySnapshotScalarWhereInput[]
    NOT?: FplEntrySnapshotScalarWhereInput | FplEntrySnapshotScalarWhereInput[]
    id?: StringFilter<"FplEntrySnapshot"> | string
    leagueId?: IntFilter<"FplEntrySnapshot"> | number
    entryId?: IntFilter<"FplEntrySnapshot"> | number
    eventId?: IntFilter<"FplEntrySnapshot"> | number
    bank?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    teamValue?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    eventTransfers?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    eventTransfersCost?: IntNullableFilter<"FplEntrySnapshot"> | number | null
    fetchedAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    createdAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"FplEntrySnapshot"> | Date | string
  }

  export type FplEntryTransferUpsertWithWhereUniqueWithoutEventInput = {
    where: FplEntryTransferWhereUniqueInput
    update: XOR<FplEntryTransferUpdateWithoutEventInput, FplEntryTransferUncheckedUpdateWithoutEventInput>
    create: XOR<FplEntryTransferCreateWithoutEventInput, FplEntryTransferUncheckedCreateWithoutEventInput>
  }

  export type FplEntryTransferUpdateWithWhereUniqueWithoutEventInput = {
    where: FplEntryTransferWhereUniqueInput
    data: XOR<FplEntryTransferUpdateWithoutEventInput, FplEntryTransferUncheckedUpdateWithoutEventInput>
  }

  export type FplEntryTransferUpdateManyWithWhereWithoutEventInput = {
    where: FplEntryTransferScalarWhereInput
    data: XOR<FplEntryTransferUpdateManyMutationInput, FplEntryTransferUncheckedUpdateManyWithoutEventInput>
  }

  export type FplLeagueEntryCreateWithoutLeagueInput = {
    id: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    transfers?: FplEntryTransferCreateNestedManyWithoutEntryInput
    behaviourProfile?: FplEntryBehaviourProfileCreateNestedOneWithoutEntryInput
  }

  export type FplLeagueEntryUncheckedCreateWithoutLeagueInput = {
    id: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    transfers?: FplEntryTransferUncheckedCreateNestedManyWithoutEntryInput
    behaviourProfile?: FplEntryBehaviourProfileUncheckedCreateNestedOneWithoutEntryInput
  }

  export type FplLeagueEntryCreateOrConnectWithoutLeagueInput = {
    where: FplLeagueEntryWhereUniqueInput
    create: XOR<FplLeagueEntryCreateWithoutLeagueInput, FplLeagueEntryUncheckedCreateWithoutLeagueInput>
  }

  export type FplLeagueEntryCreateManyLeagueInputEnvelope = {
    data: FplLeagueEntryCreateManyLeagueInput | FplLeagueEntryCreateManyLeagueInput[]
    skipDuplicates?: boolean
  }

  export type FplEntrySnapshotCreateWithoutLeagueInput = {
    id?: string
    entryId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    event: FplGameweekCreateNestedOneWithoutEntrySnapshotsInput
    picks?: FplEntryPickCreateNestedManyWithoutSnapshotInput
  }

  export type FplEntrySnapshotUncheckedCreateWithoutLeagueInput = {
    id?: string
    entryId: number
    eventId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    picks?: FplEntryPickUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type FplEntrySnapshotCreateOrConnectWithoutLeagueInput = {
    where: FplEntrySnapshotWhereUniqueInput
    create: XOR<FplEntrySnapshotCreateWithoutLeagueInput, FplEntrySnapshotUncheckedCreateWithoutLeagueInput>
  }

  export type FplEntrySnapshotCreateManyLeagueInputEnvelope = {
    data: FplEntrySnapshotCreateManyLeagueInput | FplEntrySnapshotCreateManyLeagueInput[]
    skipDuplicates?: boolean
  }

  export type FplLeagueEntryUpsertWithWhereUniqueWithoutLeagueInput = {
    where: FplLeagueEntryWhereUniqueInput
    update: XOR<FplLeagueEntryUpdateWithoutLeagueInput, FplLeagueEntryUncheckedUpdateWithoutLeagueInput>
    create: XOR<FplLeagueEntryCreateWithoutLeagueInput, FplLeagueEntryUncheckedCreateWithoutLeagueInput>
  }

  export type FplLeagueEntryUpdateWithWhereUniqueWithoutLeagueInput = {
    where: FplLeagueEntryWhereUniqueInput
    data: XOR<FplLeagueEntryUpdateWithoutLeagueInput, FplLeagueEntryUncheckedUpdateWithoutLeagueInput>
  }

  export type FplLeagueEntryUpdateManyWithWhereWithoutLeagueInput = {
    where: FplLeagueEntryScalarWhereInput
    data: XOR<FplLeagueEntryUpdateManyMutationInput, FplLeagueEntryUncheckedUpdateManyWithoutLeagueInput>
  }

  export type FplLeagueEntryScalarWhereInput = {
    AND?: FplLeagueEntryScalarWhereInput | FplLeagueEntryScalarWhereInput[]
    OR?: FplLeagueEntryScalarWhereInput[]
    NOT?: FplLeagueEntryScalarWhereInput | FplLeagueEntryScalarWhereInput[]
    id?: IntFilter<"FplLeagueEntry"> | number
    leagueId?: IntFilter<"FplLeagueEntry"> | number
    entryName?: StringFilter<"FplLeagueEntry"> | string
    playerName?: StringFilter<"FplLeagueEntry"> | string
    rank?: IntFilter<"FplLeagueEntry"> | number
    lastRank?: IntNullableFilter<"FplLeagueEntry"> | number | null
    totalPoints?: IntFilter<"FplLeagueEntry"> | number
    updatedAt?: DateTimeFilter<"FplLeagueEntry"> | Date | string
  }

  export type FplEntrySnapshotUpsertWithWhereUniqueWithoutLeagueInput = {
    where: FplEntrySnapshotWhereUniqueInput
    update: XOR<FplEntrySnapshotUpdateWithoutLeagueInput, FplEntrySnapshotUncheckedUpdateWithoutLeagueInput>
    create: XOR<FplEntrySnapshotCreateWithoutLeagueInput, FplEntrySnapshotUncheckedCreateWithoutLeagueInput>
  }

  export type FplEntrySnapshotUpdateWithWhereUniqueWithoutLeagueInput = {
    where: FplEntrySnapshotWhereUniqueInput
    data: XOR<FplEntrySnapshotUpdateWithoutLeagueInput, FplEntrySnapshotUncheckedUpdateWithoutLeagueInput>
  }

  export type FplEntrySnapshotUpdateManyWithWhereWithoutLeagueInput = {
    where: FplEntrySnapshotScalarWhereInput
    data: XOR<FplEntrySnapshotUpdateManyMutationInput, FplEntrySnapshotUncheckedUpdateManyWithoutLeagueInput>
  }

  export type FplLeagueCreateWithoutEntriesInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entrySnapshots?: FplEntrySnapshotCreateNestedManyWithoutLeagueInput
  }

  export type FplLeagueUncheckedCreateWithoutEntriesInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entrySnapshots?: FplEntrySnapshotUncheckedCreateNestedManyWithoutLeagueInput
  }

  export type FplLeagueCreateOrConnectWithoutEntriesInput = {
    where: FplLeagueWhereUniqueInput
    create: XOR<FplLeagueCreateWithoutEntriesInput, FplLeagueUncheckedCreateWithoutEntriesInput>
  }

  export type FplEntryTransferCreateWithoutEntryInput = {
    id?: string
    time: Date | string
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
    event: FplGameweekCreateNestedOneWithoutEntryTransfersInput
    playerIn: FplPlayerCreateNestedOneWithoutTransfersInInput
    playerOut: FplPlayerCreateNestedOneWithoutTransfersOutInput
  }

  export type FplEntryTransferUncheckedCreateWithoutEntryInput = {
    id?: string
    eventId: number
    time: Date | string
    playerInId: number
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferCreateOrConnectWithoutEntryInput = {
    where: FplEntryTransferWhereUniqueInput
    create: XOR<FplEntryTransferCreateWithoutEntryInput, FplEntryTransferUncheckedCreateWithoutEntryInput>
  }

  export type FplEntryTransferCreateManyEntryInputEnvelope = {
    data: FplEntryTransferCreateManyEntryInput | FplEntryTransferCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type FplEntryBehaviourProfileCreateWithoutEntryInput = {
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput = {
    transfersCount: number
    hitsCount: number
    totalHitCost: number
    avgTransfersPerGw: number
    hitRate: number
    lastTransferAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type FplEntryBehaviourProfileCreateOrConnectWithoutEntryInput = {
    where: FplEntryBehaviourProfileWhereUniqueInput
    create: XOR<FplEntryBehaviourProfileCreateWithoutEntryInput, FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput>
  }

  export type FplLeagueUpsertWithoutEntriesInput = {
    update: XOR<FplLeagueUpdateWithoutEntriesInput, FplLeagueUncheckedUpdateWithoutEntriesInput>
    create: XOR<FplLeagueCreateWithoutEntriesInput, FplLeagueUncheckedCreateWithoutEntriesInput>
    where?: FplLeagueWhereInput
  }

  export type FplLeagueUpdateToOneWithWhereWithoutEntriesInput = {
    where?: FplLeagueWhereInput
    data: XOR<FplLeagueUpdateWithoutEntriesInput, FplLeagueUncheckedUpdateWithoutEntriesInput>
  }

  export type FplLeagueUpdateWithoutEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entrySnapshots?: FplEntrySnapshotUpdateManyWithoutLeagueNestedInput
  }

  export type FplLeagueUncheckedUpdateWithoutEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entrySnapshots?: FplEntrySnapshotUncheckedUpdateManyWithoutLeagueNestedInput
  }

  export type FplEntryTransferUpsertWithWhereUniqueWithoutEntryInput = {
    where: FplEntryTransferWhereUniqueInput
    update: XOR<FplEntryTransferUpdateWithoutEntryInput, FplEntryTransferUncheckedUpdateWithoutEntryInput>
    create: XOR<FplEntryTransferCreateWithoutEntryInput, FplEntryTransferUncheckedCreateWithoutEntryInput>
  }

  export type FplEntryTransferUpdateWithWhereUniqueWithoutEntryInput = {
    where: FplEntryTransferWhereUniqueInput
    data: XOR<FplEntryTransferUpdateWithoutEntryInput, FplEntryTransferUncheckedUpdateWithoutEntryInput>
  }

  export type FplEntryTransferUpdateManyWithWhereWithoutEntryInput = {
    where: FplEntryTransferScalarWhereInput
    data: XOR<FplEntryTransferUpdateManyMutationInput, FplEntryTransferUncheckedUpdateManyWithoutEntryInput>
  }

  export type FplEntryBehaviourProfileUpsertWithoutEntryInput = {
    update: XOR<FplEntryBehaviourProfileUpdateWithoutEntryInput, FplEntryBehaviourProfileUncheckedUpdateWithoutEntryInput>
    create: XOR<FplEntryBehaviourProfileCreateWithoutEntryInput, FplEntryBehaviourProfileUncheckedCreateWithoutEntryInput>
    where?: FplEntryBehaviourProfileWhereInput
  }

  export type FplEntryBehaviourProfileUpdateToOneWithWhereWithoutEntryInput = {
    where?: FplEntryBehaviourProfileWhereInput
    data: XOR<FplEntryBehaviourProfileUpdateWithoutEntryInput, FplEntryBehaviourProfileUncheckedUpdateWithoutEntryInput>
  }

  export type FplEntryBehaviourProfileUpdateWithoutEntryInput = {
    transfersCount?: IntFieldUpdateOperationsInput | number
    hitsCount?: IntFieldUpdateOperationsInput | number
    totalHitCost?: IntFieldUpdateOperationsInput | number
    avgTransfersPerGw?: FloatFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    lastTransferAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryBehaviourProfileUncheckedUpdateWithoutEntryInput = {
    transfersCount?: IntFieldUpdateOperationsInput | number
    hitsCount?: IntFieldUpdateOperationsInput | number
    totalHitCost?: IntFieldUpdateOperationsInput | number
    avgTransfersPerGw?: FloatFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    lastTransferAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueCreateWithoutEntrySnapshotsInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FplLeagueEntryCreateNestedManyWithoutLeagueInput
  }

  export type FplLeagueUncheckedCreateWithoutEntrySnapshotsInput = {
    id: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FplLeagueEntryUncheckedCreateNestedManyWithoutLeagueInput
  }

  export type FplLeagueCreateOrConnectWithoutEntrySnapshotsInput = {
    where: FplLeagueWhereUniqueInput
    create: XOR<FplLeagueCreateWithoutEntrySnapshotsInput, FplLeagueUncheckedCreateWithoutEntrySnapshotsInput>
  }

  export type FplGameweekCreateWithoutEntrySnapshotsInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
    entryTransfers?: FplEntryTransferCreateNestedManyWithoutEventInput
  }

  export type FplGameweekUncheckedCreateWithoutEntrySnapshotsInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
    entryTransfers?: FplEntryTransferUncheckedCreateNestedManyWithoutEventInput
  }

  export type FplGameweekCreateOrConnectWithoutEntrySnapshotsInput = {
    where: FplGameweekWhereUniqueInput
    create: XOR<FplGameweekCreateWithoutEntrySnapshotsInput, FplGameweekUncheckedCreateWithoutEntrySnapshotsInput>
  }

  export type FplEntryPickCreateWithoutSnapshotInput = {
    id?: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
  }

  export type FplEntryPickUncheckedCreateWithoutSnapshotInput = {
    id?: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
  }

  export type FplEntryPickCreateOrConnectWithoutSnapshotInput = {
    where: FplEntryPickWhereUniqueInput
    create: XOR<FplEntryPickCreateWithoutSnapshotInput, FplEntryPickUncheckedCreateWithoutSnapshotInput>
  }

  export type FplEntryPickCreateManySnapshotInputEnvelope = {
    data: FplEntryPickCreateManySnapshotInput | FplEntryPickCreateManySnapshotInput[]
    skipDuplicates?: boolean
  }

  export type FplLeagueUpsertWithoutEntrySnapshotsInput = {
    update: XOR<FplLeagueUpdateWithoutEntrySnapshotsInput, FplLeagueUncheckedUpdateWithoutEntrySnapshotsInput>
    create: XOR<FplLeagueCreateWithoutEntrySnapshotsInput, FplLeagueUncheckedCreateWithoutEntrySnapshotsInput>
    where?: FplLeagueWhereInput
  }

  export type FplLeagueUpdateToOneWithWhereWithoutEntrySnapshotsInput = {
    where?: FplLeagueWhereInput
    data: XOR<FplLeagueUpdateWithoutEntrySnapshotsInput, FplLeagueUncheckedUpdateWithoutEntrySnapshotsInput>
  }

  export type FplLeagueUpdateWithoutEntrySnapshotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FplLeagueEntryUpdateManyWithoutLeagueNestedInput
  }

  export type FplLeagueUncheckedUpdateWithoutEntrySnapshotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FplLeagueEntryUncheckedUpdateManyWithoutLeagueNestedInput
  }

  export type FplGameweekUpsertWithoutEntrySnapshotsInput = {
    update: XOR<FplGameweekUpdateWithoutEntrySnapshotsInput, FplGameweekUncheckedUpdateWithoutEntrySnapshotsInput>
    create: XOR<FplGameweekCreateWithoutEntrySnapshotsInput, FplGameweekUncheckedCreateWithoutEntrySnapshotsInput>
    where?: FplGameweekWhereInput
  }

  export type FplGameweekUpdateToOneWithWhereWithoutEntrySnapshotsInput = {
    where?: FplGameweekWhereInput
    data: XOR<FplGameweekUpdateWithoutEntrySnapshotsInput, FplGameweekUncheckedUpdateWithoutEntrySnapshotsInput>
  }

  export type FplGameweekUpdateWithoutEntrySnapshotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryTransfers?: FplEntryTransferUpdateManyWithoutEventNestedInput
  }

  export type FplGameweekUncheckedUpdateWithoutEntrySnapshotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryTransfers?: FplEntryTransferUncheckedUpdateManyWithoutEventNestedInput
  }

  export type FplEntryPickUpsertWithWhereUniqueWithoutSnapshotInput = {
    where: FplEntryPickWhereUniqueInput
    update: XOR<FplEntryPickUpdateWithoutSnapshotInput, FplEntryPickUncheckedUpdateWithoutSnapshotInput>
    create: XOR<FplEntryPickCreateWithoutSnapshotInput, FplEntryPickUncheckedCreateWithoutSnapshotInput>
  }

  export type FplEntryPickUpdateWithWhereUniqueWithoutSnapshotInput = {
    where: FplEntryPickWhereUniqueInput
    data: XOR<FplEntryPickUpdateWithoutSnapshotInput, FplEntryPickUncheckedUpdateWithoutSnapshotInput>
  }

  export type FplEntryPickUpdateManyWithWhereWithoutSnapshotInput = {
    where: FplEntryPickScalarWhereInput
    data: XOR<FplEntryPickUpdateManyMutationInput, FplEntryPickUncheckedUpdateManyWithoutSnapshotInput>
  }

  export type FplEntryPickScalarWhereInput = {
    AND?: FplEntryPickScalarWhereInput | FplEntryPickScalarWhereInput[]
    OR?: FplEntryPickScalarWhereInput[]
    NOT?: FplEntryPickScalarWhereInput | FplEntryPickScalarWhereInput[]
    id?: StringFilter<"FplEntryPick"> | string
    snapshotId?: StringFilter<"FplEntryPick"> | string
    playerId?: IntFilter<"FplEntryPick"> | number
    pickPosition?: IntFilter<"FplEntryPick"> | number
    multiplier?: IntFilter<"FplEntryPick"> | number
    isCaptain?: BoolFilter<"FplEntryPick"> | boolean
    isViceCaptain?: BoolFilter<"FplEntryPick"> | boolean
  }

  export type FplEntrySnapshotCreateWithoutPicksInput = {
    id?: string
    entryId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    league: FplLeagueCreateNestedOneWithoutEntrySnapshotsInput
    event: FplGameweekCreateNestedOneWithoutEntrySnapshotsInput
  }

  export type FplEntrySnapshotUncheckedCreateWithoutPicksInput = {
    id?: string
    leagueId: number
    entryId: number
    eventId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FplEntrySnapshotCreateOrConnectWithoutPicksInput = {
    where: FplEntrySnapshotWhereUniqueInput
    create: XOR<FplEntrySnapshotCreateWithoutPicksInput, FplEntrySnapshotUncheckedCreateWithoutPicksInput>
  }

  export type FplEntrySnapshotUpsertWithoutPicksInput = {
    update: XOR<FplEntrySnapshotUpdateWithoutPicksInput, FplEntrySnapshotUncheckedUpdateWithoutPicksInput>
    create: XOR<FplEntrySnapshotCreateWithoutPicksInput, FplEntrySnapshotUncheckedCreateWithoutPicksInput>
    where?: FplEntrySnapshotWhereInput
  }

  export type FplEntrySnapshotUpdateToOneWithWhereWithoutPicksInput = {
    where?: FplEntrySnapshotWhereInput
    data: XOR<FplEntrySnapshotUpdateWithoutPicksInput, FplEntrySnapshotUncheckedUpdateWithoutPicksInput>
  }

  export type FplEntrySnapshotUpdateWithoutPicksInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    league?: FplLeagueUpdateOneRequiredWithoutEntrySnapshotsNestedInput
    event?: FplGameweekUpdateOneRequiredWithoutEntrySnapshotsNestedInput
  }

  export type FplEntrySnapshotUncheckedUpdateWithoutPicksInput = {
    id?: StringFieldUpdateOperationsInput | string
    leagueId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueEntryCreateWithoutTransfersInput = {
    id: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    league: FplLeagueCreateNestedOneWithoutEntriesInput
    behaviourProfile?: FplEntryBehaviourProfileCreateNestedOneWithoutEntryInput
  }

  export type FplLeagueEntryUncheckedCreateWithoutTransfersInput = {
    id: number
    leagueId: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    behaviourProfile?: FplEntryBehaviourProfileUncheckedCreateNestedOneWithoutEntryInput
  }

  export type FplLeagueEntryCreateOrConnectWithoutTransfersInput = {
    where: FplLeagueEntryWhereUniqueInput
    create: XOR<FplLeagueEntryCreateWithoutTransfersInput, FplLeagueEntryUncheckedCreateWithoutTransfersInput>
  }

  export type FplGameweekCreateWithoutEntryTransfersInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
    entrySnapshots?: FplEntrySnapshotCreateNestedManyWithoutEventInput
  }

  export type FplGameweekUncheckedCreateWithoutEntryTransfersInput = {
    id: number
    name: string
    deadlineTime: Date | string
    finished: boolean
    isCurrent: boolean
    isNext: boolean
    updatedAt?: Date | string
    entrySnapshots?: FplEntrySnapshotUncheckedCreateNestedManyWithoutEventInput
  }

  export type FplGameweekCreateOrConnectWithoutEntryTransfersInput = {
    where: FplGameweekWhereUniqueInput
    create: XOR<FplGameweekCreateWithoutEntryTransfersInput, FplGameweekUncheckedCreateWithoutEntryTransfersInput>
  }

  export type FplPlayerCreateWithoutTransfersInInput = {
    id: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    team: FplTeamCreateNestedOneWithoutPlayersInput
    position: FplPositionCreateNestedOneWithoutPlayersInput
    transfersOut?: FplEntryTransferCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerUncheckedCreateWithoutTransfersInInput = {
    id: number
    teamId: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    transfersOut?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerOutInput
  }

  export type FplPlayerCreateOrConnectWithoutTransfersInInput = {
    where: FplPlayerWhereUniqueInput
    create: XOR<FplPlayerCreateWithoutTransfersInInput, FplPlayerUncheckedCreateWithoutTransfersInInput>
  }

  export type FplPlayerCreateWithoutTransfersOutInput = {
    id: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    team: FplTeamCreateNestedOneWithoutPlayersInput
    position: FplPositionCreateNestedOneWithoutPlayersInput
    transfersIn?: FplEntryTransferCreateNestedManyWithoutPlayerInInput
  }

  export type FplPlayerUncheckedCreateWithoutTransfersOutInput = {
    id: number
    teamId: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
    transfersIn?: FplEntryTransferUncheckedCreateNestedManyWithoutPlayerInInput
  }

  export type FplPlayerCreateOrConnectWithoutTransfersOutInput = {
    where: FplPlayerWhereUniqueInput
    create: XOR<FplPlayerCreateWithoutTransfersOutInput, FplPlayerUncheckedCreateWithoutTransfersOutInput>
  }

  export type FplLeagueEntryUpsertWithoutTransfersInput = {
    update: XOR<FplLeagueEntryUpdateWithoutTransfersInput, FplLeagueEntryUncheckedUpdateWithoutTransfersInput>
    create: XOR<FplLeagueEntryCreateWithoutTransfersInput, FplLeagueEntryUncheckedCreateWithoutTransfersInput>
    where?: FplLeagueEntryWhereInput
  }

  export type FplLeagueEntryUpdateToOneWithWhereWithoutTransfersInput = {
    where?: FplLeagueEntryWhereInput
    data: XOR<FplLeagueEntryUpdateWithoutTransfersInput, FplLeagueEntryUncheckedUpdateWithoutTransfersInput>
  }

  export type FplLeagueEntryUpdateWithoutTransfersInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    league?: FplLeagueUpdateOneRequiredWithoutEntriesNestedInput
    behaviourProfile?: FplEntryBehaviourProfileUpdateOneWithoutEntryNestedInput
  }

  export type FplLeagueEntryUncheckedUpdateWithoutTransfersInput = {
    id?: IntFieldUpdateOperationsInput | number
    leagueId?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    behaviourProfile?: FplEntryBehaviourProfileUncheckedUpdateOneWithoutEntryNestedInput
  }

  export type FplGameweekUpsertWithoutEntryTransfersInput = {
    update: XOR<FplGameweekUpdateWithoutEntryTransfersInput, FplGameweekUncheckedUpdateWithoutEntryTransfersInput>
    create: XOR<FplGameweekCreateWithoutEntryTransfersInput, FplGameweekUncheckedCreateWithoutEntryTransfersInput>
    where?: FplGameweekWhereInput
  }

  export type FplGameweekUpdateToOneWithWhereWithoutEntryTransfersInput = {
    where?: FplGameweekWhereInput
    data: XOR<FplGameweekUpdateWithoutEntryTransfersInput, FplGameweekUncheckedUpdateWithoutEntryTransfersInput>
  }

  export type FplGameweekUpdateWithoutEntryTransfersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entrySnapshots?: FplEntrySnapshotUpdateManyWithoutEventNestedInput
  }

  export type FplGameweekUncheckedUpdateWithoutEntryTransfersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    deadlineTime?: DateTimeFieldUpdateOperationsInput | Date | string
    finished?: BoolFieldUpdateOperationsInput | boolean
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isNext?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entrySnapshots?: FplEntrySnapshotUncheckedUpdateManyWithoutEventNestedInput
  }

  export type FplPlayerUpsertWithoutTransfersInInput = {
    update: XOR<FplPlayerUpdateWithoutTransfersInInput, FplPlayerUncheckedUpdateWithoutTransfersInInput>
    create: XOR<FplPlayerCreateWithoutTransfersInInput, FplPlayerUncheckedCreateWithoutTransfersInInput>
    where?: FplPlayerWhereInput
  }

  export type FplPlayerUpdateToOneWithWhereWithoutTransfersInInput = {
    where?: FplPlayerWhereInput
    data: XOR<FplPlayerUpdateWithoutTransfersInInput, FplPlayerUncheckedUpdateWithoutTransfersInInput>
  }

  export type FplPlayerUpdateWithoutTransfersInInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: FplTeamUpdateOneRequiredWithoutPlayersNestedInput
    position?: FplPositionUpdateOneRequiredWithoutPlayersNestedInput
    transfersOut?: FplEntryTransferUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUncheckedUpdateWithoutTransfersInInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfersOut?: FplEntryTransferUncheckedUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUpsertWithoutTransfersOutInput = {
    update: XOR<FplPlayerUpdateWithoutTransfersOutInput, FplPlayerUncheckedUpdateWithoutTransfersOutInput>
    create: XOR<FplPlayerCreateWithoutTransfersOutInput, FplPlayerUncheckedCreateWithoutTransfersOutInput>
    where?: FplPlayerWhereInput
  }

  export type FplPlayerUpdateToOneWithWhereWithoutTransfersOutInput = {
    where?: FplPlayerWhereInput
    data: XOR<FplPlayerUpdateWithoutTransfersOutInput, FplPlayerUncheckedUpdateWithoutTransfersOutInput>
  }

  export type FplPlayerUpdateWithoutTransfersOutInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: FplTeamUpdateOneRequiredWithoutPlayersNestedInput
    position?: FplPositionUpdateOneRequiredWithoutPlayersNestedInput
    transfersIn?: FplEntryTransferUpdateManyWithoutPlayerInNestedInput
  }

  export type FplPlayerUncheckedUpdateWithoutTransfersOutInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfersIn?: FplEntryTransferUncheckedUpdateManyWithoutPlayerInNestedInput
  }

  export type FplLeagueEntryCreateWithoutBehaviourProfileInput = {
    id: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    league: FplLeagueCreateNestedOneWithoutEntriesInput
    transfers?: FplEntryTransferCreateNestedManyWithoutEntryInput
  }

  export type FplLeagueEntryUncheckedCreateWithoutBehaviourProfileInput = {
    id: number
    leagueId: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
    transfers?: FplEntryTransferUncheckedCreateNestedManyWithoutEntryInput
  }

  export type FplLeagueEntryCreateOrConnectWithoutBehaviourProfileInput = {
    where: FplLeagueEntryWhereUniqueInput
    create: XOR<FplLeagueEntryCreateWithoutBehaviourProfileInput, FplLeagueEntryUncheckedCreateWithoutBehaviourProfileInput>
  }

  export type FplLeagueEntryUpsertWithoutBehaviourProfileInput = {
    update: XOR<FplLeagueEntryUpdateWithoutBehaviourProfileInput, FplLeagueEntryUncheckedUpdateWithoutBehaviourProfileInput>
    create: XOR<FplLeagueEntryCreateWithoutBehaviourProfileInput, FplLeagueEntryUncheckedCreateWithoutBehaviourProfileInput>
    where?: FplLeagueEntryWhereInput
  }

  export type FplLeagueEntryUpdateToOneWithWhereWithoutBehaviourProfileInput = {
    where?: FplLeagueEntryWhereInput
    data: XOR<FplLeagueEntryUpdateWithoutBehaviourProfileInput, FplLeagueEntryUncheckedUpdateWithoutBehaviourProfileInput>
  }

  export type FplLeagueEntryUpdateWithoutBehaviourProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    league?: FplLeagueUpdateOneRequiredWithoutEntriesNestedInput
    transfers?: FplEntryTransferUpdateManyWithoutEntryNestedInput
  }

  export type FplLeagueEntryUncheckedUpdateWithoutBehaviourProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    leagueId?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfers?: FplEntryTransferUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type FplPlayerCreateManyTeamInput = {
    id: number
    positionId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
  }

  export type FplPlayerUpdateWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    position?: FplPositionUpdateOneRequiredWithoutPlayersNestedInput
    transfersIn?: FplEntryTransferUpdateManyWithoutPlayerInNestedInput
    transfersOut?: FplEntryTransferUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUncheckedUpdateWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfersIn?: FplEntryTransferUncheckedUpdateManyWithoutPlayerInNestedInput
    transfersOut?: FplEntryTransferUncheckedUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUncheckedUpdateManyWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    positionId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplPlayerCreateManyPositionInput = {
    id: number
    teamId: number
    firstName: string
    secondName: string
    webName: string
    nowCost: number
    status: string
    news?: string | null
    selectedByPercent?: number | null
    transfersInEvent?: number
    transfersOutEvent?: number
    updatedAt?: Date | string
  }

  export type FplPlayerUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: FplTeamUpdateOneRequiredWithoutPlayersNestedInput
    transfersIn?: FplEntryTransferUpdateManyWithoutPlayerInNestedInput
    transfersOut?: FplEntryTransferUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUncheckedUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfersIn?: FplEntryTransferUncheckedUpdateManyWithoutPlayerInNestedInput
    transfersOut?: FplEntryTransferUncheckedUpdateManyWithoutPlayerOutNestedInput
  }

  export type FplPlayerUncheckedUpdateManyWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    secondName?: StringFieldUpdateOperationsInput | string
    webName?: StringFieldUpdateOperationsInput | string
    nowCost?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    news?: NullableStringFieldUpdateOperationsInput | string | null
    selectedByPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    transfersInEvent?: IntFieldUpdateOperationsInput | number
    transfersOutEvent?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferCreateManyPlayerInInput = {
    id?: string
    entryId: number
    eventId: number
    time: Date | string
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferCreateManyPlayerOutInput = {
    id?: string
    entryId: number
    eventId: number
    time: Date | string
    playerInId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferUpdateWithoutPlayerInInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FplLeagueEntryUpdateOneRequiredWithoutTransfersNestedInput
    event?: FplGameweekUpdateOneRequiredWithoutEntryTransfersNestedInput
    playerOut?: FplPlayerUpdateOneRequiredWithoutTransfersOutNestedInput
  }

  export type FplEntryTransferUncheckedUpdateWithoutPlayerInInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutPlayerInInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUpdateWithoutPlayerOutInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FplLeagueEntryUpdateOneRequiredWithoutTransfersNestedInput
    event?: FplGameweekUpdateOneRequiredWithoutEntryTransfersNestedInput
    playerIn?: FplPlayerUpdateOneRequiredWithoutTransfersInNestedInput
  }

  export type FplEntryTransferUncheckedUpdateWithoutPlayerOutInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutPlayerOutInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntrySnapshotCreateManyEventInput = {
    id?: string
    leagueId: number
    entryId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FplEntryTransferCreateManyEventInput = {
    id?: string
    entryId: number
    time: Date | string
    playerInId: number
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntrySnapshotUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    league?: FplLeagueUpdateOneRequiredWithoutEntrySnapshotsNestedInput
    picks?: FplEntryPickUpdateManyWithoutSnapshotNestedInput
  }

  export type FplEntrySnapshotUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    leagueId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: FplEntryPickUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type FplEntrySnapshotUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    leagueId?: IntFieldUpdateOperationsInput | number
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FplLeagueEntryUpdateOneRequiredWithoutTransfersNestedInput
    playerIn?: FplPlayerUpdateOneRequiredWithoutTransfersInNestedInput
    playerOut?: FplPlayerUpdateOneRequiredWithoutTransfersOutNestedInput
  }

  export type FplEntryTransferUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplLeagueEntryCreateManyLeagueInput = {
    id: number
    entryName: string
    playerName: string
    rank: number
    lastRank?: number | null
    totalPoints: number
    updatedAt?: Date | string
  }

  export type FplEntrySnapshotCreateManyLeagueInput = {
    id?: string
    entryId: number
    eventId: number
    bank?: number | null
    teamValue?: number | null
    eventTransfers?: number | null
    eventTransfersCost?: number | null
    fetchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FplLeagueEntryUpdateWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfers?: FplEntryTransferUpdateManyWithoutEntryNestedInput
    behaviourProfile?: FplEntryBehaviourProfileUpdateOneWithoutEntryNestedInput
  }

  export type FplLeagueEntryUncheckedUpdateWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transfers?: FplEntryTransferUncheckedUpdateManyWithoutEntryNestedInput
    behaviourProfile?: FplEntryBehaviourProfileUncheckedUpdateOneWithoutEntryNestedInput
  }

  export type FplLeagueEntryUncheckedUpdateManyWithoutLeagueInput = {
    id?: IntFieldUpdateOperationsInput | number
    entryName?: StringFieldUpdateOperationsInput | string
    playerName?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    lastRank?: NullableIntFieldUpdateOperationsInput | number | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntrySnapshotUpdateWithoutLeagueInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: FplGameweekUpdateOneRequiredWithoutEntrySnapshotsNestedInput
    picks?: FplEntryPickUpdateManyWithoutSnapshotNestedInput
  }

  export type FplEntrySnapshotUncheckedUpdateWithoutLeagueInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: FplEntryPickUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type FplEntrySnapshotUncheckedUpdateManyWithoutLeagueInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    teamValue?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfers?: NullableIntFieldUpdateOperationsInput | number | null
    eventTransfersCost?: NullableIntFieldUpdateOperationsInput | number | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferCreateManyEntryInput = {
    id?: string
    eventId: number
    time: Date | string
    playerInId: number
    playerOutId: number
    value?: number | null
    bank?: number | null
    cost?: number | null
    createdAt?: Date | string
  }

  export type FplEntryTransferUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: FplGameweekUpdateOneRequiredWithoutEntryTransfersNestedInput
    playerIn?: FplPlayerUpdateOneRequiredWithoutTransfersInNestedInput
    playerOut?: FplPlayerUpdateOneRequiredWithoutTransfersOutNestedInput
  }

  export type FplEntryTransferUncheckedUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryTransferUncheckedUpdateManyWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    playerInId?: IntFieldUpdateOperationsInput | number
    playerOutId?: IntFieldUpdateOperationsInput | number
    value?: NullableIntFieldUpdateOperationsInput | number | null
    bank?: NullableIntFieldUpdateOperationsInput | number | null
    cost?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FplEntryPickCreateManySnapshotInput = {
    id?: string
    playerId: number
    pickPosition: number
    multiplier: number
    isCaptain: boolean
    isViceCaptain: boolean
  }

  export type FplEntryPickUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplEntryPickUncheckedUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FplEntryPickUncheckedUpdateManyWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: IntFieldUpdateOperationsInput | number
    pickPosition?: IntFieldUpdateOperationsInput | number
    multiplier?: IntFieldUpdateOperationsInput | number
    isCaptain?: BoolFieldUpdateOperationsInput | boolean
    isViceCaptain?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}